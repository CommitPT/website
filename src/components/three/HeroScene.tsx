'use client'

import { motionEnabled } from '@/src/lib/motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const CommitGraph = dynamic(() => import('@/src/components/three/CommitGraph'), { ssr: false })

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

/**
 * A cena é um extra. Só vale a pena em aparelhos que a aguentam sem custo para o
 * visitante — nos outros fica o degradê CSS, que já é a identidade do site.
 */
function deviceCanRender(): boolean {
  if (!motionEnabled()) return false
  if (window.innerWidth < 768) return false
  if ((navigator as NavigatorWithConnection).connection?.saveData) return false
  if ((navigator.hardwareConcurrency ?? 8) <= 4) return false
  const probe = document.createElement('canvas')
  return !!(probe.getContext('webgl2') || probe.getContext('webgl'))
}

/** requestIdleCallback quando existe (não há no Safari), senão um timeout curto. */
function whenIdle(fn: () => void): void {
  const idle = window.requestIdleCallback as typeof window.requestIdleCallback | undefined
  if (idle) idle(fn, { timeout: 2000 })
  else window.setTimeout(fn, 400)
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Decide se o commit graph entra, e só então carrega o three.js (chunk à parte,
// pedido com o painel já visível e o browser livre).

export default function HeroScene() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor || !deviceCanRender()) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      whenIdle(() => setShow(true))
    })
    observer.observe(anchor)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={anchorRef} aria-hidden className="pointer-events-none absolute inset-0">
      {show && <CommitGraph />}
    </div>
  )
}
