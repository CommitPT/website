'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { buttonVariants } from '@commitpt/design-system'

type ConsentState = 'accepted' | 'declined' | null

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null
    setConsent(stored)
    setMounted(true)
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  if (!mounted) return null

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[#151922]"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Usamos o Google Analytics para perceber como os visitantes utilizam o site (páginas
              visitadas, duração e origem do tráfego). Nenhum dado é recolhido sem o teu
              consentimento e os cookies não são usados para publicidade.{' '}
              <a
                href="/privacy"
                className="text-foreground underline underline-offset-2 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </a>
            </p>
            <div className="flex w-full shrink-0 justify-end gap-3 sm:w-auto">
              <button
                onClick={handleDecline}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                Recusar
              </button>
              <button onClick={handleAccept} className={buttonVariants({ size: 'sm' })}>
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
