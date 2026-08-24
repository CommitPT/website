'use client'

import { useEffect, useRef, useState } from 'react'
import { ExpandableText } from '@/src/components/ExpandableText'
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  reviewCardVariants,
} from '@commitpt/design-system'
import { Star } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReviewItem {
  id: string
  name: string
  handle: string
  date: string
  review: string
  stars: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(raw: string): string {
  if (raw.includes('T') || (raw.includes('-') && raw.length > 10)) {
    const d = new Date(raw)
    return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
  }
  const [d, m, y] = raw.split('-').map(Number)
  return `${d} de ${MONTHS[m - 1]} de ${y}`
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TestimonialCard({
  t,
  expanded,
  onExpand,
}: {
  t: ReviewItem
  expanded?: boolean
  onExpand?: () => void
}) {
  const clamped = Math.min(5, Math.max(0, Math.round(t.stars)))

  return (
    <Card
      data-slot="review-card"
      className={`${reviewCardVariants()} w-80 flex-shrink-0 lg:cursor-default`}
      onClick={() => {
        // pony: tap anywhere on mobile to expand/collapse; desktop only via button
        onExpand?.()
      }}
    >
      {/* Author Header & Rating */}
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 p-4 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="default" variant="secondary">
            <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium leading-none text-foreground">
              {t.name}
            </span>
            <span className="text-xs text-muted-foreground">{t.handle}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {Array.from({ length: 5 }, (_, i) =>
            i < clamped ? (
              <Star key={i} className="icon-xs" />
            ) : (
              <Star key={i} className="icon-xs fill-transparent" />
            )
          )}
          <span className="ml-1 text-xs font-medium text-foreground">{clamped}/5</span>
        </div>
      </CardHeader>

      {/* Review Content */}
      <CardContent className="flex-1 px-4 pb-3 pt-0">
        <ExpandableText text={t.review} lines={3} expanded={expanded} />
      </CardContent>

      {/* Review Date Footer */}
      <CardFooter className="px-4 pb-4 pt-0">
        <span className="text-xs text-muted-foreground">{formatDate(t.date)}</span>
      </CardFooter>
    </Card>
  )
}

/**
 * Wrapper para a metade duplicada do marquee. `aria-hidden` evita que os
 * leitores de ecrã leiam cada testemunho duas vezes; `inert` garante que os
 * botões "Ver mais" dessa metade também saem da ordem de tabulação — sem isso,
 * o utilizador de teclado navegava para dentro de conteúdo escondido.
 */
function MarqueeClone({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.inert = true
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="flex gap-4 lg:gap-6">
      {children}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ReviewScroll({ items }: { items: ReviewItem[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="relative overflow-hidden pb-16 lg:pb-28">
      {/* Edge fade overlays — desktop only */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-32 bg-linear-to-r from-background to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-32 bg-linear-to-l from-background to-transparent lg:block" />

      {/* Mobile: native horizontal scroll with snap */}
      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 lg:hidden">
        {items.map((t) => (
          <TestimonialCard
            key={t.id}
            t={t}
            expanded={expandedId === t.id}
            onExpand={() => setExpandedId(expandedId === t.id ? null : t.id)}
          />
        ))}
      </div>

      {/* Desktop: infinite marquee */}
      <div className="animate-marquee pause-on-hover hidden w-max gap-4 px-6 lg:flex lg:gap-6">
        {items.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
        {/* Segunda metade só existe para o loop visual. */}
        <MarqueeClone>
          {items.map((t) => (
            <TestimonialCard key={`clone-${t.id}`} t={t} />
          ))}
        </MarqueeClone>
      </div>
    </div>
  )
}
