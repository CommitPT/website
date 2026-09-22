'use client'

import { buildCommitGraph } from '@/src/components/three/commitGraphData'
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

    // ── Tamanho ──
    const resize = () => {
      const { clientWidth, clientHeight } = container
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    return () => {
      resizeObserver.disconnect()
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
