import { getWhopReviews } from '@/src/lib/whop'
import fallbackReviews from '@/src/reviews.json'
import { ReviewCard, Typography } from '@commitpt/design-system'

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

function TestimonialCard({ t }: { t: ReviewItem }) {
  return (
    <ReviewCard
      className="w-80 flex-shrink-0"
      name={t.name}
      memberSince={t.handle}
      review={t.review}
      rating={t.stars}
      reviewDate={formatDate(t.date)}
    />
  )
}

export default async function SocialProof() {
  const whopReviews = await getWhopReviews()

  const whopItems: ReviewItem[] = whopReviews
    .filter((r) => r.description)
    .map((r) => ({
      id: `whop-${r.id}`,
      name: r.user.name,
      handle: `@${r.user.username}`,
      date: r.created_at,
      review: r.description!,
      stars: Math.round(r.stars),
    }))

  const hardcodedItems: ReviewItem[] = fallbackReviews.map((r, i) => ({
    id: `hardcoded-${i}`,
    name: r.name,
    handle: r.discordUsername,
    date: r.dateOfReview,
    review: r.review,
    stars: Math.round(r.stars),
  }))

  // Whop reviews first, hardcoded reviews after
  const testimonials: ReviewItem[] = [...whopItems, ...hardcodedItems]

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
            programar sozinhos. Avaliações recolhidas via{' '}
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              Whop
            </a>{' '}
            e Comunidade.
          </Typography>
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-6 lg:hidden"
        style={{ scrollbarWidth: 'none' }}
        tabIndex={0}
      >
        {testimonials.map((t) => (
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
