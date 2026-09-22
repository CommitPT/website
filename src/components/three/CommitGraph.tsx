'use client'

import { buildCommitGraph, type Graph } from '@/src/components/three/commitGraphData'
import { cssVarToRgb } from '@/src/lib/cssColor'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Ponto redondo com falloff suave, para os commits não serem quadrados. */
function createDotTexture(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.45, 'rgba(255,255,255,0.85)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Cena única do site: o histórico de git da comunidade. Pontos = commits,
// linhas = a ligação entre eles. As cores vêm da paleta da visita (--bg-from/to).
// Montada só pelo HeroScene, que já validou que o aparelho aguenta.

export default function CommitGraph() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearAlpha(0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 2.6)

    const group = new THREE.Group()
    group.rotation.set(0.18, -0.42, 0.04)
    scene.add(group)

    // ── Geometria a partir do grafo ──
    const graph = buildCommitGraph()
    const colorFrom = new THREE.Color(...cssVarToRgb('--bg-from', [0.42, 0.65, 1]))
    const colorTo = new THREE.Color(...cssVarToRgb('--bg-to', [0.6, 0.45, 0.95]))
    // Aclaradas de propósito: a mistura aditiva por cima do degradê come contraste.
    const laneColor = (lane: number) =>
      (lane === 0
        ? colorFrom.clone()
        : colorFrom.clone().lerp(colorTo, Math.min(1, lane / 3 + 0.35))
      ).lerp(new THREE.Color(1, 1, 1), 0.45)

    const positions = new Float32Array(graph.nodes.length * 3)
    const colors = new Float32Array(graph.nodes.length * 3)
    graph.nodes.forEach((node, i) => {
      positions.set([node.x, node.y, node.z], i * 3)
      colors.set(laneColor(node.lane).toArray(), i * 3)
    })

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const dotTexture = createDotTexture()
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    group.add(new THREE.Points(pointsGeometry, pointsMaterial))

    const edgePositions = new Float32Array(graph.edges.length * 6)
    const edgeColors = new Float32Array(graph.edges.length * 6)
    graph.edges.forEach((edge, i) => {
      const a = graph.nodes[edge.from]
      const b = graph.nodes[edge.to]
      edgePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)
      edgeColors.set([...laneColor(a.lane).toArray(), ...laneColor(b.lane).toArray()], i * 6)
    })

    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3))
    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.LineSegments(linesGeometry, linesMaterial))

    // ── HEAD: o commit "a ser feito", a percorrer a linha main ──
    const mainNodes = graph.nodes.filter((node) => node.lane === 0)
    const headGeometry = new THREE.BufferGeometry()
    headGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3))
    const headMaterial = new THREE.PointsMaterial({
      size: 0.3,
      map: dotTexture,
      color: new THREE.Color(1, 1, 1),
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    group.add(new THREE.Points(headGeometry, headMaterial))

    // ── Movimento ──
    //
    // Sem loop infinito de translação (o grafo não é periódico e o salto via-se):
    // deriva lenta em seno, um balanço de rotação, parallax do rato e o HEAD a
    // avançar de commit em commit.

    const HEAD_SECONDS_PER_COMMIT = 0.55
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    // Tempo próprio (THREE.Clock está descontinuado): só conta enquanto a cena corre,
    // por isso voltar ao separador não dá saltos.
    let elapsed = 0
    let lastTick = 0
    let frame = 0
    let running = false

    const updateHead = (elapsed: number, nodes: Graph['nodes']) => {
      const progress = (elapsed / HEAD_SECONDS_PER_COMMIT) % nodes.length
      const current = nodes[Math.floor(progress)]
      const next = nodes[(Math.floor(progress) + 1) % nodes.length]
      const t = progress % 1
      // Ao voltar ao início, o HEAD reaparece no primeiro commit em vez de atravessar a cena.
      const target = next.x > current.x ? next : current
      const position = headGeometry.getAttribute('position') as THREE.BufferAttribute
      position.setXYZ(
        0,
        current.x + (target.x - current.x) * t,
        current.y + (target.y - current.y) * t,
        current.z + (target.z - current.z) * t
      )
      position.needsUpdate = true
      headMaterial.opacity = 0.35 + 0.55 * Math.abs(Math.sin(progress * Math.PI))
    }

    const renderFrame = () => {
      const now = performance.now()
      elapsed += Math.min((now - lastTick) / 1000, 0.1)
      lastTick = now
      group.position.x = Math.sin(elapsed * 0.08) * 0.5
      pointer.x += (pointer.targetX - pointer.x) * 0.04
      pointer.y += (pointer.targetY - pointer.y) * 0.04
      group.rotation.y = -0.42 + Math.sin(elapsed * 0.12) * 0.05 + pointer.x * 0.12
      group.rotation.x = 0.18 + pointer.y * 0.08
      updateHead(elapsed, mainNodes)
      renderer.render(scene, camera)
    }

    const loop = () => {
      if (!running) return
      renderFrame()
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running) return
      running = true
      lastTick = performance.now()
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    // Só anima com o painel à vista e o separador ativo.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start()
      else stop()
    })
    visibility.observe(container)

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (container.getBoundingClientRect().bottom > 0) start()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // ── Tamanho ──
    const resize = () => {
      const { clientWidth, clientHeight } = container
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderFrame()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    return () => {
      stop()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      headGeometry.dispose()
      headMaterial.dispose()
      pointsGeometry.dispose()
      linesGeometry.dispose()
      pointsMaterial.dispose()
      linesMaterial.dispose()
      dotTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    />
  )
}
