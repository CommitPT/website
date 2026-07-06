import reviewsData from '@/src/reviews.json'
import { Star } from 'lucide-react'
import { Typography } from '@commitpt/design-system'

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
  const [d, m, y] = raw.split('-').map(Number)
  return `${d} de ${MONTHS[m - 1]} de ${y}`
}

interface Testimonial {
  name: string
  discordUsername: string
  dateOfReview: string
  review: string
  stars: number
}

const testimonials: Testimonial[] = reviewsData

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-warning text-warning' : 'fill-border text-border'}`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name[0]

  return (
    <div className="flex w-80 flex-shrink-0 flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
      <StarRating count={t.stars} />
      <Typography variant="small" color="muted" className="flex-1 leading-relaxed">
        &ldquo;{t.review}&rdquo;
      </Typography>
      <Typography variant="caption" color="muted" as="span" className="font-mono">
        {formatDate(t.dateOfReview)}
      </Typography>
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-xs font-bold text-primary">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
          <span className="font-mono text-xs text-primary">{t.discordUsername}</span>
        </div>
      </div>
    </div>
  )
}

export default function SocialProof() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-6xl px-6 pt-20 lg:pt-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            05 // O Que Dizem os Membros
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Engenheiros reais. Resultados reais.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Não acredites só na nossa palavra. É isto que acontece quando os programadores param de
            programar sozinhos.
          </Typography>
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-6 lg:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>

      {/* Desktop: infinite marquee */}
      <div className="relative hidden overflow-hidden pb-28 lg:block">
        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-background to-transparent" />

        <div className="animate-marquee pause-on-hover flex w-max gap-6 px-6">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
