'use client'

import { trackEvent, type AnalyticsEvent } from '@/src/lib/analytics'
import { cx } from '@/src/lib/cx'
import type { ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type CtaVariant = 'accent' | 'outline' | 'ghost'
type CtaSize = 'sm' | 'md' | 'lg'

interface CtaLinkProps {
  href: string
  event: AnalyticsEvent
  /** Onde o CTA está (header, hero, pricing…) — enviado como `location`. */
  location: string
  variant?: CtaVariant
  size?: CtaSize
  className?: string
  children: ReactNode
}

// ── Styles ────────────────────────────────────────────────────────────────────
//
// `accent` segue a paleta do fundo (--bg-accent), por isso o CTA principal
// combina sempre com o degradê da visita. Todas as paletas têm acentos claros,
// daí o texto escuro.

const VARIANTS: Record<CtaVariant, string> = {
  accent: 'bg-(--bg-accent) text-background hover:brightness-110',
  outline: 'border border-border text-foreground hover:border-foreground/40 hover:bg-foreground/5',
  ghost: 'text-muted-foreground hover:text-foreground',
}

const SIZES: Record<CtaSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CtaLink({
  href,
  event,
  location,
  variant = 'accent',
  size = 'md',
  className,
  children,
}: CtaLinkProps) {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      onClick={() => trackEvent(event, { location })}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition focus-visible:ring-2 focus-visible:ring-(--bg-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {children}
    </a>
  )
}
