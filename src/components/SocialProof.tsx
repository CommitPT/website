import { getWhopReviews } from '@/src/lib/whop'
import fallbackReviews from '@/src/reviews.json'
import ReviewScroll from '@/src/components/ReviewScroll'
import { Typography } from '@commitpt/design-system'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReviewItem {
  id: string
  name: string
  handle: string
  date: string
  review: string
  stars: number
}

// ── Component ─────────────────────────────────────────────────────────────────

export default async function SocialProof() {
  // Fetch Whop reviews dynamically
  const whopReviews = await getWhopReviews()

  // Format Whop reviews to match standard structure
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

  // Format fallback local reviews
  const hardcodedItems: ReviewItem[] = fallbackReviews.map((r, i) => ({
    id: `hardcoded-${i}`,
    name: r.name,
    handle: r.discordUsername,
    date: r.dateOfReview,
    review: r.review,
    stars: Math.round(r.stars),
  }))

  // Combine dynamic and static items
  const items: ReviewItem[] = [...whopItems, ...hardcodedItems]

  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-6xl px-6 pt-20 lg:pt-28">
        {/* Section Header */}
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

      {/* Reviews Marquee / Scroll Component */}
      <ReviewScroll items={items} />
    </section>
  )
}
