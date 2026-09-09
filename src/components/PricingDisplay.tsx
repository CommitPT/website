'use client'

import { trackEvent } from '@/src/lib/analytics'
import { WHOP_COMMIT_PLUS_ANNUAL_URL, WHOP_COMMIT_PLUS_URL } from '@/src/lib/links'
import { buttonVariants, Typography } from '@commitpt/design-system'
import { ArrowRight } from 'lucide-react'

export const eur = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' })

export type BillingCycle = 'monthly' | 'annual'

export interface PricingDisplayProps {
  monthlyPrice: number
  annualPrice: number
}

export function annualMonthlyEquivalent(annualPrice: number): number {
  return annualPrice / 12
}

/** Botão de CTA que aponta para o checkout Whop correto consoante o ciclo escolhido. */
export function PricingCta({
  billing,
  annualPrice,
  className = '',
}: {
  billing: BillingCycle
  annualPrice: number
  className?: string
}) {
  const href = billing === 'monthly' ? WHOP_COMMIT_PLUS_URL : WHOP_COMMIT_PLUS_ANNUAL_URL
  const label =
    billing === 'monthly' ? 'Experimentar Commit+' : `Aderir por ${eur.format(annualPrice)}/ano`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({ size: 'lg', className: `gap-2 group ${className}` })}
      onClick={() => trackEvent('commit_plus_checkout', { billing })}
    >
      {label}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </a>
  )
}

/**
 * Bloco de preço (badges + valor + subtexto), sem cartão à volta — para
 * compor dentro de um cartão com a mesma estrutura de outras ofertas (ex.:
 * a comparação Grátis vs Commit+).
 */
export function PriceHeading({
  billing,
  monthlyPrice,
  annualPrice,
}: { billing: BillingCycle } & PricingDisplayProps) {
  const isAnnual = billing === 'annual'

  return (
    <div>
      {isAnnual && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-300/10 px-3 py-1 font-mono text-xs text-primary-300">
            Melhor valor
          </span>
          <span className="rounded-full bg-primary-300 px-3 py-1 font-mono text-xs text-background">
            Poupa 50%
          </span>
        </div>
      )}

      {isAnnual ? (
        <div className="flex flex-wrap items-baseline gap-3">
          <Typography variant="small" color="muted" className="font-mono line-through">
            {eur.format(monthlyPrice)}
          </Typography>
          <Typography variant="h1" as="p" className="font-mono text-primary-300">
            {eur.format(annualMonthlyEquivalent(annualPrice))}
            <span className="text-xl text-muted-foreground">/mês</span>
          </Typography>
        </div>
      ) : (
        <Typography variant="h1" as="p" className="font-mono text-primary-300">
          {eur.format(monthlyPrice)}
          <span className="text-xl text-muted-foreground">/mês</span>
        </Typography>
      )}

      <Typography variant="small" color="muted" className="mt-2 block font-mono">
        {isAnnual
          ? `${eur.format(annualPrice)} cobrados anualmente`
          : 'Pagamento mensal. Cancela quando quiseres.'}
      </Typography>
    </div>
  )
}
