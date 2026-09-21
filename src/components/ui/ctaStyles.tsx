import { cx } from '@/src/lib/cx'
import type { ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type CtaVariant = 'accent' | 'outline' | 'ghost'
export type CtaSize = 'sm' | 'md' | 'lg'

// ── Styles ────────────────────────────────────────────────────────────────────
//
// Partilhado por CtaLink (<a>) e por botões (<button>, ex.: CookieConsent).
//
// accent  — "tecla": cor da paleta (--bg-accent) com rebordo que afunda ao
//           clicar (utility `btn-key` em globals.css). Texto escuro porque
//           todas as paletas têm acentos claros.
// outline — contorno simples; a borda ganha a cor da paleta no hover.
// ghost   — link de texto com sublinhado que cresce no hover.

const VARIANTS: Record<CtaVariant, string> = {
  accent: 'btn-key rounded-md',
  outline:
    'rounded-md border border-border text-foreground transition-colors hover:border-(--bg-accent)/60 hover:bg-foreground/5',
  ghost: 'text-muted-foreground transition-colors hover:text-foreground',
}

const SIZES: Record<CtaSize, string> = {
  sm: 'h-9 px-3.5 text-sm [--key-depth:2px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function ctaClassName(variant: CtaVariant, size: CtaSize, className?: string): string {
  return cx(
    'group relative inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-(--bg-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
    VARIANTS[variant],
    SIZES[size],
    className
  )
}

// ── Decorations ───────────────────────────────────────────────────────────────

interface CtaContentProps {
  variant: CtaVariant
  children: ReactNode
}

/** Conteúdo do CTA + decoração da variante (sublinhado no ghost). */
export function CtaContent({ variant, children }: CtaContentProps) {
  if (variant !== 'ghost') return <>{children}</>

  return (
    <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform group-hover:after:scale-x-100">
      {children}
    </span>
  )
}
