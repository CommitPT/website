'use client'

import { MOTION_DEADLINE_MS, motionEnabled } from '@/src/lib/motion'
import { useEffect } from 'react'

// ── Component ─────────────────────────────────────────────────────────────────
//
// Única peça cliente das animações da homepage. As secções continuam Server
// Components e só marcam o que anima com atributos:
//
//   data-reveal-group   contentor cujos [data-reveal] entram em cascata
//   data-reveal         elemento que aparece ao entrar no ecrã (sozinho ou num grupo)
//
// O anime.js é carregado aqui por import() — fica fora do "First Load JS".

type Revert = () => void

export default function HomeMotion() {
  useEffect(() => {
    if (!motionEnabled()) return

    const root = document.documentElement
    // Chegámos tarde: a animação CSS de segurança já revelou tudo. Desligar o movimento
    // em vez de voltar a esconder o que o visitante já está a ver.
    if (performance.now() > MOTION_DEADLINE_MS) {
      root.removeAttribute('data-motion')
      return
    }
    root.setAttribute('data-motion-ready', '')

    let cancelled = false
    const cleanups: Revert[] = []

    import(/* webpackExports: ["animate", "stagger"] */ 'animejs').then(({ animate, stagger }) => {
      if (cancelled) return

      const reveal = (targets: Element[], cascade: boolean) => {
        const animation = animate(targets, {
          opacity: [0, 1],
          y: [16, 0],
          duration: 600,
          delay: cascade ? stagger(70) : 0,
          ease: 'out(3)',
        })
        cleanups.push(() => animation.revert())
      }

      const groups = [...document.querySelectorAll<HTMLElement>('[data-reveal-group]')]
      const singles = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
        (el) => !el.closest('[data-reveal-group]')
      )

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            observer.unobserve(entry.target)
            if (entry.target.hasAttribute('data-reveal-group')) {
              reveal([...entry.target.querySelectorAll('[data-reveal]')], true)
            } else {
              reveal([entry.target], false)
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px' }
      )
      for (const el of [...groups, ...singles]) observer.observe(el)
      cleanups.push(() => observer.disconnect())
    })

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      root.removeAttribute('data-motion-ready')
    }
  }, [])

  return null
}
