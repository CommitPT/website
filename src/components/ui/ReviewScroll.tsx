'use client'

import { cx } from '@/src/lib/cx'
import { ChevronDown, Star } from 'lucide-react'
import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ReviewItem {
  id: string
  name: string
  handle: string
  /** ISO da Whop ou `DD-MM-AAAA` das avaliações locais. */
  date: string
  review: string
  stars: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function formatDate(raw: string): string {
  if (raw.includes('T') || raw.length > 10) {
    const date = new Date(raw)
    return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
  }
  const [day, month, year] = raw.split('-').map(Number)
  return `${day} de ${MONTHS[month - 1]} de ${year}`
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * Texto cortado em 3 linhas com "Ver mais". Escrito aqui em vez de usar o
 * ExpandableText do design system: importar do pacote num componente cliente
 * traz o barril inteiro e somava 17 kB ao carregamento inicial da página.
 */
function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <p className={cx('text-sm text-muted-foreground', !expanded && 'line-clamp-3')}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="mt-2 inline-flex items-center gap-1 text-xs text-(--bg-accent) hover:underline"
      >
        {expanded ? 'Ver menos' : 'Ver mais'}
        <ChevronDown
          size={14}
          aria-hidden
          className={cx('transition-transform', expanded && 'rotate-180')}
        />
      </button>
    </>
  )
}

/**
 * `decorative` é a cópia que existe só para o marquee dar a volta: mostra o texto
 * cortado em vez do "Ver mais", para não haver botões repetidos na ordem de
 * tabulação nem lidos duas vezes pelos leitores de ecrã.
 */
function ReviewCard({ item, decorative = false }: { item: ReviewItem; decorative?: boolean }) {
  const stars = Math.min(5, Math.max(0, Math.round(item.stars)))

  return (
    <article
      data-slot="review-card"
      className="flex w-80 shrink-0 snap-start flex-col rounded-lg border border-border bg-background"
    >
      <header className="flex flex-row items-start justify-between gap-2 p-4 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-xs text-foreground">
            {initials(item.name)}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm leading-none font-medium text-foreground">
              {item.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">{item.handle}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1" aria-label={`${stars} em 5 estrelas`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cx('icon-xs', i >= stars && 'fill-transparent')} />
          ))}
          <span className="ml-1 font-mono text-xs text-foreground">{stars}/5</span>
        </div>
      </header>

      <div className="flex-1 px-4 pt-0 pb-3">
        {decorative ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">{item.review}</p>
        ) : (
          <ReviewText text={item.review} />
        )}
      </div>

      <footer className="px-4 pt-0 pb-4">
        <span className="font-mono text-xs text-muted-foreground">{formatDate(item.date)}</span>
      </footer>
    </article>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Telemóvel: scroll horizontal nativo com snap. Desktop: marquee contínuo, que
// pára ao passar o rato e com `prefers-reduced-motion` (regras em globals.css).

export default function ReviewScroll({ items }: { items: ReviewItem[] }) {
  if (!items.length) return null

  return (
    // overflow-hidden: sem isto o marquee passa por fora da moldura, para cima do degradê.
    <div className="relative overflow-hidden">
      {/* Esbatimento nas pontas, só onde o marquee corre */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-linear-to-r from-background to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-linear-to-l from-background to-transparent lg:block" />

      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:hidden">
        {items.map((item) => (
          <ReviewCard key={item.id} item={item} />
        ))}
      </div>

      <div className="animate-marquee pause-on-hover hidden w-max gap-6 px-5 sm:px-8 lg:flex">
        {items.map((item) => (
          <ReviewCard key={item.id} item={item} />
        ))}
        <div aria-hidden className="flex gap-6">
          {items.map((item) => (
            <ReviewCard key={`clone-${item.id}`} item={item} decorative />
          ))}
        </div>
      </div>
    </div>
  )
}
