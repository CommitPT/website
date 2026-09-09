'use client'

import BillingToggle from '@/src/components/BillingToggle'
import {
  PriceHeading,
  PricingCta,
  type BillingCycle,
  type PricingDisplayProps,
} from '@/src/components/PricingDisplay'
import { trackEvent } from '@/src/lib/analytics'
import { DISCORD_URL } from '@/src/lib/links'
import { buttonVariants, Typography } from '@commitpt/design-system'
import { Check, MessageCircle } from 'lucide-react'
import { useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const FREE_BENEFITS = [
  'Entrar no Discord e conhecer a comunidade',
  'Fazer perguntas e participar nas discussões técnicas',
  'Acompanhar eventos e conteúdo partilhado pela comunidade',
]

const PLUS_BENEFITS = [
  'Commit Talks, Commit Sessions e Commit Career',
  'Oportunidade de participar em projetos elegíveis da comunidade',
  'Feedback técnico e revisões de código',
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CommitPlusCards({ monthlyPrice, annualPrice }: PricingDisplayProps) {
  const [billing, setBilling] = useState<BillingCycle>('annual')
  const isAnnual = billing === 'annual'

  return (
    <>
      <div className="flex justify-center">
        <BillingToggle billing={billing} onChange={setBilling} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
        {/* Free Tier */}
        <div className="flex flex-col rounded-2xl border border-border bg-surface p-8 lg:p-10">
          <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
            Comunidade
          </span>
          <Typography variant="h1" as="p" className="mt-4 font-mono">
            Grátis
          </Typography>
          <Typography variant="small" color="muted" className="mt-2 block font-mono">
            Sempre. Sem cartão de crédito.
          </Typography>

          <ul className="mt-6 flex-1 space-y-3">
            {FREE_BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'mt-8 w-full gap-2',
            })}
            onClick={() => trackEvent('community_join_click', { location: 'commit-plus' })}
          >
            <MessageCircle size={16} />
            Entrar Gratuitamente
          </a>
        </div>

        {/* Commit+ */}
        <div
          className={`flex flex-col rounded-2xl border p-8 lg:p-10 ${
            isAnnual ? 'border-primary-300 bg-surface' : 'border-primary/40 bg-surface'
          }`}
        >
          <PriceHeading billing={billing} monthlyPrice={monthlyPrice} annualPrice={annualPrice} />

          <Typography variant="p" color="muted" className="mt-4">
            Acesso a Commit Talks, Commit Sessions, Commit Career, oportunidades de participação nos
            projetos elegíveis e feedback técnico.
          </Typography>

          <ul className="mt-6 flex-1 space-y-3">
            {PLUS_BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-primary-300" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          <PricingCta billing={billing} annualPrice={annualPrice} className="mt-8 w-full" />
        </div>
      </div>
    </>
  )
}
