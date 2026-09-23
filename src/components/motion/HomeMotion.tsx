'use client'

import { motionEnabled } from '@/src/lib/motion'
import { useEffect } from 'react'

// ── Component ─────────────────────────────────────────────────────────────────
//
// Única peça cliente das animações da homepage. As secções continuam Server
// Components e só marcam o que anima com atributos:
//
//   data-reveal-group   contentor cujos [data-reveal] entram em cascata
//   data-reveal         elemento que aparece ao entrar no ecrã (sozinho ou num grupo)
//   data-count-group    contentor cujos [data-count] contam até ao valor final
//   data-diff-group     contentor cujos [data-diff-line] entram como um diff aplicado
//   data-hero-title     título do hero: só se move, nunca fica invisível (LCP)
//
// O anime.js é carregado aqui por import() — fica fora do "First Load JS".

type Cleanup = () => void

/** Seletores observados; cada um tem o seu efeito em `runEffect`. */
const TRIGGERS = '[data-reveal-group], [data-reveal], [data-count-group], [data-diff-group]'

const show = (el: Element) => ((el as HTMLElement).style.opacity = '1')

export default function HomeMotion() {
  useEffect(() => {
    if (!motionEnabled()) return

    const root = document.documentElement

    // Chegámos tarde? A pergunta certa é se a animação CSS de segurança já revelou os
    // elementos — não quanto tempo passou desde o início da navegação (em `yarn dev` a
    // compilação sozinha ultrapassa qualquer prazo, e numa ligação lenta também).
    const sample = document.querySelector('[data-reveal]')
    if (sample && parseFloat(getComputedStyle(sample).opacity) > 0.99) {
      root.removeAttribute('data-motion')
      return
    }
    root.setAttribute('data-motion-ready', '')

    let cancelled = false
    const cleanups: Cleanup[] = []

    import(/* webpackExports: ["animate", "stagger", "utils"] */ 'animejs').then(
      ({ animate, stagger }) => {
        if (cancelled) return

        const track = (animation: { revert: () => unknown }) =>
          cleanups.push(() => animation.revert())

        // ── Efeitos ──

        const reveal = (targets: Element[], cascade: boolean) =>
          track(
            animate(targets, {
              opacity: [0, 1],
              y: [16, 0],
              duration: 600,
              delay: cascade ? stagger(70) : 0,
              ease: 'out(3)',
            })
          )

        // Conta até ao valor que já está no HTML (o texto final nunca depende do JS).
        const countUp = (el: Element) => {
          const finalText = el.textContent ?? ''
          const target = Number(finalText.replace(/\D/g, ''))
          const suffix = finalText.replace(/[\d\s  ]/g, '')
          if (!target) return
          const counter = { value: 0 }
          track(
            animate(counter, {
              value: target,
              duration: 1200,
              ease: 'out(4)',
              onUpdate: () => {
                const value = Math.round(counter.value).toLocaleString('pt-PT').replace(/ /g, ' ')
                el.textContent = value + suffix
              },
              onComplete: () => {
                el.textContent = finalText
              },
            })
          )
        }

        // Linhas `+` do Commit+ a entrar como um diff a ser aplicado, com flash verde.
        const applyDiff = (lines: Element[]) => {
          track(
            animate(lines, {
              opacity: [0, 1],
              x: [-10, 0],
              duration: 450,
              delay: stagger(80),
              ease: 'out(3)',
            })
          )
          // Acaba no mesmo verde que o CSS dá às linhas em repouso (globals.css,
          // [data-diff-line]): o flash acende e assenta, em vez de desaparecer.
          track(
            animate(lines, {
              // Sintaxe antiga de propósito: o anime.js não faz parse de `rgb(r g b / a)`.
              backgroundColor: ['rgba(126, 231, 135, 0.32)', 'rgba(126, 231, 135, 0.1)'],
              duration: 900,
              delay: stagger(80),
              ease: 'out(2)',
            })
          )
        }

        const runEffect = (el: Element, animated: boolean) => {
          if (el.hasAttribute('data-reveal-group')) {
            const targets = [...el.querySelectorAll('[data-reveal]')]
            animated ? reveal(targets, true) : targets.forEach(show)
          } else if (el.hasAttribute('data-count-group')) {
            if (animated) el.querySelectorAll('[data-count]').forEach(countUp)
          } else if (el.hasAttribute('data-diff-group')) {
            const targets = [...el.querySelectorAll('[data-diff-line]')]
            animated ? applyDiff(targets) : targets.forEach(show)
          } else {
            animated ? reveal([el], false) : show(el)
          }
        }

        // ── Observação ──

        // Um [data-reveal] dentro de um grupo é animado pelo grupo, a menos que tenha
        // um efeito próprio (ex.: a lista de números é revelada pelo grupo e conta sozinha).
        const ownEffect = '[data-reveal-group], [data-count-group], [data-diff-group]'
        const pending = new Set<Element>(
          [...document.querySelectorAll(TRIGGERS)].filter(
            (el) => el.matches(ownEffect) || !el.closest('[data-reveal-group]')
          )
        )

        const handle = (el: Element, animated: boolean) => {
          pending.delete(el)
          observer.unobserve(el)
          runEffect(el, animated)
        }

        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) handle(entry.target, true)
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
              if (el.getBoundingClientRect().bottom < 0) handle(el, false)
            }
          })
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        cleanups.push(() => {
          observer.disconnect()
          window.removeEventListener('scroll', onScroll)
        })

        // O título do hero nunca fica invisível (é o LCP): só acompanha a entrada.
        const heroTitle = document.querySelector('[data-hero-title]')
        if (heroTitle) track(animate(heroTitle, { y: [10, 0], duration: 700, ease: 'out(3)' }))
      }
    )

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
      root.removeAttribute('data-motion-ready')
    }
  }, [])

  return null
}
