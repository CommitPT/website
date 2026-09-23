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
          {/* Linhas de contexto do diff: sem marca, é a base sobre a qual o Commit+ acrescenta. */}
          <ul className="mt-6 space-y-2 font-mono text-sm">
            {free.features.map((feature) => (
              <li key={feature} className="pl-4 text-muted-foreground">
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
          {/* Cabeçalho de hunk: decoração, por isso escondida do leitor de ecrã. */}
          <p aria-hidden className="mt-6 font-mono text-xs text-success/70">
            @@ o que o Commit+ acrescenta @@
          </p>
          <ul data-diff-group className="mt-2 space-y-1 font-mono text-sm">
            <li className="py-1 pl-4 text-muted-foreground">{plus.includes}</li>
            {plus.features.map((feature) => (
              <li
                key={feature}
                data-diff-line
                className="flex gap-2 rounded-r-sm border-l-2 border-success/60 py-1 pr-2 pl-2 text-foreground"
              >
                {/* Marca fixa: o texto que passa para a linha seguinte alinha, como num diff. */}
                <span aria-hidden className="shrink-0 text-success">
                  +
                </span>
                <span>{feature}</span>
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
