'use client'

import CtaLink from '@/src/components/ui/CtaLink'
import { cx } from '@/src/lib/cx'
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from '@/src/lib/consent'
import { DISCORD_URL } from '@/src/lib/links'
import { useEffect, useState } from 'react'

// ── Component ─────────────────────────────────────────────────────────────────
//
// No telemóvel, entre o hero e a secção de preços o visitante fica sem nenhum CTA à
// vista. Esta barra cobre esse intervalo: aparece quando o hero sai do ecrã e
// desaparece na secção de preços, onde seria repetir o que já está lá.
//
// O aviso de cookies também é fixo em baixo, por isso a barra espera pela decisão.

export default function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false)
  const [atPricing, setAtPricing] = useState(false)
  const [consentDecided, setConsentDecided] = useState(true)

  useEffect(() => {
    const read = () => {
      try {
        setConsentDecided(!!localStorage.getItem(CONSENT_STORAGE_KEY))
      } catch {
        setConsentDecided(true) // sem localStorage não há aviso a tapar a barra
      }
    }
    read()
    window.addEventListener(CONSENT_EVENT, read)
    return () => window.removeEventListener(CONSENT_EVENT, read)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    const pricing = document.getElementById('precos')
    if (!hero || !pricing) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setPastHero(!entry.isIntersecting)
        if (entry.target === pricing) setAtPricing(entry.isIntersecting)
      }
    })
    observer.observe(hero)
    observer.observe(pricing)
    return () => observer.disconnect()
  }, [])

  const visible = pastHero && !atPricing && consentDecided

  return (
    <>
      {/* Espaço no fim da página para a barra não tapar o rodapé. */}
      <div aria-hidden className="h-20 md:hidden" />
      <div
        className={cx(
          'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md transition-transform duration-300 md:hidden',
          visible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Só existe quando está à vista: escondida, não apanha o teclado nem o leitor de ecrã. */}
        {visible && (
          <div className="flex gap-3 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <CtaLink
              href={DISCORD_URL}
              event="community_join_click"
              location="mobile_bar"
              className="flex-1"
            >
              Entrar grátis
            </CtaLink>
            <CtaLink
              href="#precos"
              event="pricing_anchor_click"
              location="mobile_bar"
              variant="outline"
              className="flex-1"
            >
              Commit+
            </CtaLink>
          </div>
        )}
      </div>
    </>
  )
}
