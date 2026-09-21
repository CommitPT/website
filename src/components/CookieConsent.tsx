'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { CtaContent, ctaClassName } from '@/src/components/ui/ctaStyles'

// ── Types ─────────────────────────────────────────────────────────────────────

type ConsentState = 'accepted' | 'declined' | null

// ── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'cookie_consent'

// ── Component ─────────────────────────────────────────────────────────────────

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null
    if (stored) setConsent(stored)
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  return (
    <>
      {/* Google Analytics & Whop Analytics Scripts */}
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
          <Script id="whop-analytics" strategy="afterInteractive">
            {`
              !function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");
              whop.setScope("biz_Vy9fmtrjBri4HX");
              whop.track("page");
            `}
          </Script>
        </>
      )}

      {/* Cookie Banner Dialog */}
      {consent === null && (
        <div
          role="dialog"
          aria-label="Consentimento de cookies"
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Usamos o Google Analytics e a Whop para perceber como os visitantes utilizam o site
              (páginas visitadas, duração e origem do tráfego). Nenhum dado é recolhido sem o teu
              consentimento e os cookies não são usados para publicidade.{' '}
              <a
                href="/privacy"
                className="text-foreground underline underline-offset-2 transition-colors hover:text-(--bg-accent)"
              >
                Política de Privacidade
              </a>
            </p>
            <div className="flex w-full shrink-0 justify-end gap-3 sm:w-auto">
              <button
                type="button"
                onClick={handleDecline}
                className={ctaClassName('outline', 'sm')}
              >
                <CtaContent variant="outline">Recusar</CtaContent>
              </button>
              <button type="button" onClick={handleAccept} className={ctaClassName('accent', 'sm')}>
                <CtaContent variant="accent">Aceitar</CtaContent>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
