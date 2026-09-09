import CommitPlusCards from '@/src/components/CommitPlusCards'
import { getWhopCustomerCount, getWhopPlanPrices } from '@/src/lib/whop'
import { Typography } from '@commitpt/design-system'

// Preços de fallback caso a API do Whop esteja indisponível — manter alinhados com os planos em
// https://whop.com/checkout/plan_URa1YJQ4gwEFO (mensal) e
// https://whop.com/checkout/plan_Nbo8ywkwalxoW (anual)
const FALLBACK_MONTHLY_PRICE = 19.99
const FALLBACK_ANNUAL_PRICE = 119.88

// ── Component ─────────────────────────────────────────────────────────────────

export default async function CommitPlusSection() {
  const [planPrices, customerCount] = await Promise.all([
    getWhopPlanPrices(),
    getWhopCustomerCount(),
  ])

  const monthlyPrice = planPrices.monthly ?? FALLBACK_MONTHLY_PRICE
  const annualPrice = planPrices.annual ?? FALLBACK_ANNUAL_PRICE

  return (
    <section id="commit-plus" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'08 // Grátis vs Commit+'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Participa à tua maneira.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            A comunidade é sempre gratuita. O Commit+ é uma camada opcional para quem quer ir mais
            fundo.
          </Typography>
        </div>

        <CommitPlusCards monthlyPrice={monthlyPrice} annualPrice={annualPrice} />

        {customerCount !== null && (
          <Typography variant="small" color="muted" className="mt-8 block text-center font-mono">
            {customerCount}+ membros já fazem parte do Commit+.
          </Typography>
        )}
      </div>
    </section>
  )
}
