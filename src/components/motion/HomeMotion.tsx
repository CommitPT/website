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
      const pending = new Set<Element>([...groups, ...singles])

      const targetsOf = (el: Element) =>
        el.hasAttribute('data-reveal-group') ? [...el.querySelectorAll('[data-reveal]')] : [el]

      const show = (el: Element, animated: boolean) => {
        pending.delete(el)
        observer.unobserve(el)
        const targets = targetsOf(el)
        if (animated) reveal(targets, el.hasAttribute('data-reveal-group'))
        else for (const target of targets) (target as HTMLElement).style.opacity = '1'
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) show(entry.target, true)
        },
        { rootMargin: '0px 0px -10% 0px' }
      )
      for (const el of pending) observer.observe(el)

      // Saltos de âncora (menu) passam por cima de secções inteiras sem as fazer
      // intersectar. O que já ficou acima do ecrã aparece de imediato, sem animação.
      let scheduled = false
      const onScroll = () => {
        if (scheduled) return
        scheduled = true
        requestAnimationFrame(() => {
          scheduled = false
          for (const el of [...pending]) {
            if (el.getBoundingClientRect().bottom < 0) show(el, false)
          }
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      cleanups.push(() => {
        observer.disconnect()
        window.removeEventListener('scroll', onScroll)
      })
    })

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      root.removeAttribute('data-motion-ready')
    }
  }, [])

  return null
}
