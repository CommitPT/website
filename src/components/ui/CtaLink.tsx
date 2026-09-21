'use client'

import {
  CtaContent,
  ctaClassName,
  type CtaSize,
  type CtaVariant,
} from '@/src/components/ui/ctaStyles'
import { trackEvent, type AnalyticsEvent } from '@/src/lib/analytics'
import type { ReactNode } from 'react'

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

/** Link de conversão: estilos de ctaStyles + target/rel externos + tracking. */
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
      className={ctaClassName(variant, size, className)}
    >
      <CtaContent variant={variant}>{children}</CtaContent>
    </a>
  )
}
