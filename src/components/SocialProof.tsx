import { getWhopReviews } from '@/src/lib/whop'
import fallbackReviews from '@/src/reviews.json'
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Typography,
  reviewCardVariants,
} from '@commitpt/design-system'
import { Star } from 'lucide-react'

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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function TestimonialCard({ t }: { t: ReviewItem }) {
  const clamped = Math.min(5, Math.max(0, Math.round(t.stars)))

  return (
    <Card data-slot="review-card" className={`${reviewCardVariants()} w-80 flex-shrink-0`}>
      <CardHeader className="flex flex-col gap-2 space-y-0 p-4 pb-3 @[20rem]:flex-row @[20rem]:items-center @[20rem]:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="default" variant="secondary">
            <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium leading-none text-foreground">
              {t.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{t.handle}</span>
              {/* Mobile: compact "★ 4/5" after handle, pushed right */}
              <div className="ml-auto flex items-center gap-1 sm:hidden">
                <Star className="icon-xs" />
                <span className="text-xs font-medium text-foreground">{clamped}/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: full 5-star display */}
        <div className="hidden justify-end sm:flex">
          {Array.from({ length: 5 }, (_, i) =>
            i < clamped ? (
              <Star key={i} className="icon-xs" />
            ) : (
              <Star key={i} className="icon-xs fill-transparent" />
            )
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-3 pt-0">
        <p className="text-xs leading-5 text-gray-50">{t.review}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <span className="text-xs text-muted-foreground">{formatDate(t.date)}</span>
      </CardFooter>
    </Card>
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
              className="text-primary underline underline-offset-2"
            >
              Whop
            </a>{' '}
            e Comunidade.
          </Typography>
        </div>
      </div>

      {/* Infinite marquee — same slow auto-slide on mobile and desktop */}
      <div className="relative overflow-hidden pb-16 lg:pb-28">
        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent lg:w-32" />

        <div className="animate-marquee pause-on-hover flex w-max gap-4 px-6 lg:gap-6">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
