import fallbackReviews from '@/src/reviews.json'
import { getWhopReviews } from '@/src/lib/whop'
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

interface ReviewItem {
  id: string
  name: string
  handle: string
  date: string
  review: string
  stars: number
}

function formatDate(raw: string): string {
  // ISO 8601 from Whop API
  if (raw.includes('T') || (raw.includes('-') && raw.length > 10)) {
    const d = new Date(raw)
    return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
  }
  // Legacy DD-MM-YYYY from reviews.json
  const [d, m, y] = raw.split('-').map(Number)
  return `${d} de ${MONTHS[m - 1]} de ${y}`
}

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

function TestimonialCard({ t }: { t: ReviewItem }) {
  const initials = t.name[0]

  return (
    <div className="flex w-80 flex-shrink-0 flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
      <StarRating count={t.stars} />
      <Typography variant="small" color="muted" className="flex-1 leading-relaxed">
        &ldquo;{t.review}&rdquo;
      </Typography>
      <Typography variant="caption" color="muted" as="span" className="font-mono">
        {formatDate(t.date)}
      </Typography>
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-xs font-bold text-primary">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
          <span className="font-mono text-xs text-primary">{t.handle}</span>
        </div>
      </div>
    </div>
  )
}

export default async function SocialProof() {
  const whopReviews = await getWhopReviews()

  const testimonials: ReviewItem[] =
    whopReviews.length > 0
      ? whopReviews
          .filter((r) => r.description)
          .map((r) => ({
            id: r.id,
            name: r.user.name,
            handle: `@${r.user.username}`,
            date: r.created_at,
            review: r.description!,
            stars: r.stars,
          }))
      : fallbackReviews.map((r, i) => ({
          id: String(i),
          name: r.name,
          handle: r.discordUsername,
          date: r.dateOfReview,
          review: r.review,
          stars: r.stars,
        }))

  const unique = testimonials.filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i)
  const doubled = [...unique, ...unique]

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
            programar sozinhos. Avaliações recolhidas via{' '}
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              Whop
            </a>
            .
          </Typography>
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-6 lg:hidden"
        style={{ scrollbarWidth: 'none' }}
        tabIndex={0}
      >
        {unique.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>

      {/* Desktop: infinite marquee */}
      <div className="relative hidden overflow-hidden pb-28 lg:block">
        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-background to-transparent" />

        <div className="animate-marquee pause-on-hover flex w-max gap-6 px-6">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
