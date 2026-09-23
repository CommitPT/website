import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import CtaLink from '@/src/components/ui/CtaLink'
import { pricing } from '@/src/content/home'
import { DISCORD_URL, WHOP_COMMIT_PLUS_ANNUAL_URL, WHOP_COMMIT_PLUS_URL } from '@/src/lib/links'

// ── Component ─────────────────────────────────────────────────────────────────
//
// Commit+ apresentado como diff do Gratuito: "Tudo do Gratuito" + linhas `+`.
// O plano anual é o destaque; o mensal fica como link secundário.

export default function Pricing() {
  const { free, plus } = pricing

  return (
    <Section id="precos">
      <SectionHeading label={pricing.label} title={pricing.title} />
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gratuito */}
        <div className="flex flex-col rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground">{free.name}</h3>
          <p className="mt-4 font-mono text-4xl text-foreground">{free.price}</p>
          <p className="mt-1 text-sm text-muted-foreground">{free.note}</p>
          <ul className="mt-6 space-y-2 font-mono text-sm">
            {free.features.map((feature) => (
              <li key={feature} className="text-muted-foreground">
                <span aria-hidden className="mr-2 text-foreground/50">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <CtaLink
              href={DISCORD_URL}
              event="community_join_click"
              location="pricing"
              variant="outline"
              className="w-full"
            >
              {free.cta}
            </CtaLink>
          </div>
        </div>

        {/* Commit+ */}
        <div className="flex flex-col rounded-lg border border-(--bg-accent)/60 bg-(--bg-accent)/5 p-6 ring-1 ring-(--bg-accent)/20">
          <h3 className="font-semibold text-(--bg-accent)">{plus.name}</h3>
          <p className="mt-4 font-mono text-4xl text-foreground">
            {plus.price}
            <span className="text-base text-muted-foreground">{plus.period}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{plus.note}</p>
          <ul data-diff-group className="mt-6 space-y-2 font-mono text-sm">
            <li className="text-muted-foreground">
              <span aria-hidden className="mr-2 text-foreground/50">
                ✓
              </span>
              {plus.includes}
            </li>
            {plus.features.map((feature) => (
              <li key={feature} data-diff-line className="rounded-sm text-foreground">
                <span aria-hidden className="mr-2 text-success">
                  +
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaLink
              href={WHOP_COMMIT_PLUS_ANNUAL_URL}
              event="commit_plus_checkout"
              location="pricing_annual"
              className="w-full"
            >
              {plus.cta}
            </CtaLink>
            <CtaLink
              href={WHOP_COMMIT_PLUS_URL}
              event="commit_plus_checkout"
              location="pricing_monthly"
              variant="ghost"
              size="sm"
            >
              {plus.monthlyCta}
            </CtaLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
