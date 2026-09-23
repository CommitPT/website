import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import ReviewScroll, { type ReviewItem } from '@/src/components/ui/ReviewScroll'
import { testimonials } from '@/src/content/home'
import localReviews from '@/src/reviews.json'
import { getWhopReviews } from '@/src/lib/whop'

/** Duas avaliações são a mesma se o texto começa igual (a mesma pessoa na Whop e no ficheiro). */
const fingerprint = (review: string) =>
  review.toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 60)

async function collectReviews(): Promise<ReviewItem[]> {
  // getWhopReviews() já devolve [] sem chave de API e recorre à última resposta boa se a API falhar.
  const whop = await getWhopReviews()

  const items: ReviewItem[] = whop
    .filter((review) => review.description)
    .map((review) => ({
      id: `whop-${review.id}`,
      name: review.user.name,
      handle: `@${review.user.username}`,
      date: review.created_at,
      review: review.description!,
      stars: review.stars,
    }))

  const seen = new Set(items.map((item) => fingerprint(item.review)))

  localReviews.forEach((review, i) => {
    if (seen.has(fingerprint(review.review))) return
    items.push({
      id: `local-${i}`,
      name: review.name,
      handle: review.discordUsername,
      date: review.dateOfReview,
      review: review.review,
      stars: review.stars,
    })
  })

  return items
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Server Component: as avaliações da Whop juntam-se às locais no servidor, e só
// o carrossel é cliente. Sem chave de API, a secção mostra na mesma as locais.

export default async function Testimonials() {
  const items = await collectReviews()

  return (
    <Section id="testemunhos" width="wide" bleed className="py-16 md:py-24">
      <div className="px-5 sm:px-8">
        <SectionHeading label={testimonials.label} title={testimonials.title} />
      </div>
      <ReviewScroll items={items} />
      <p className="mt-8 px-5 text-center text-sm text-muted-foreground sm:px-8">
        {testimonials.note}
      </p>
    </Section>
  )
}
