import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import CtaLink from '@/src/components/ui/CtaLink'
import { howItWorks, type Tier } from '@/src/content/home'
import { cx } from '@/src/lib/cx'

const TIER_TAG: Record<Tier, { label: string; className: string }> = {
  free: { label: 'Grátis', className: 'border-border text-muted-foreground' },
  plus: { label: 'Commit+', className: 'border-(--bg-accent)/40 text-(--bg-accent)' },
}

function TierTag({ tier }: { tier: Tier }) {
  const tag = TIER_TAG[tier]
  return (
    <span
      className={cx(
        'inline-flex shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px]',
        tag.className
      )}
    >
      {tag.label}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Descreve, não compara: o que é cada ritual, com que ritmo acontece e com o que
// o membro fica. A linha final assume o que a CommitPT não é — isso ganha mais
// confiança do que qualquer comparação com cursos ou licenciaturas.
//
// Desktop: tabela. Telemóvel: um cartão por ritual (4 colunas não cabem em 375px).

export default function HowItWorks() {
  return (
    <Section id="como-funciona" width="wide">
      <SectionHeading label={howItWorks.label} title={howItWorks.title} />

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Ritual', 'O que é', 'Ritmo', 'Sais com'].map((heading, i) => (
                <th
                  key={heading}
                  scope="col"
                  className={cx(
                    'p-4 font-mono text-xs font-normal text-muted-foreground',
                    i === 0 && 'w-48',
                    i === 2 && 'w-44'
                  )}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {howItWorks.rituals.map((ritual) => (
              <tr key={ritual.name} className="border-b border-border last:border-b-0">
                <th scope="row" className="p-4 align-top font-medium text-foreground">
                  <span className="flex flex-col items-start gap-2">
                    {ritual.name}
                    <TierTag tier={ritual.tier} />
                  </span>
                </th>
                <td className="p-4 align-top text-muted-foreground">{ritual.what}</td>
                <td className="p-4 align-top font-mono text-xs text-foreground">
                  {ritual.cadence}
                </td>
                <td className="p-4 align-top text-foreground">{ritual.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Telemóvel */}
      <ul className="space-y-4 md:hidden">
        {howItWorks.rituals.map((ritual) => (
          <li key={ritual.name} className="rounded-lg border border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-foreground">{ritual.name}</h3>
              <TierTag tier={ritual.tier} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{ritual.what}</p>
            <dl className="mt-4 space-y-1 font-mono text-xs">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Ritmo:</dt>
                <dd className="text-foreground">{ritual.cadence}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 text-muted-foreground">Sais com:</dt>
                <dd className="text-foreground">{ritual.outcome}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* O que a CommitPT não é — dito por nós, antes de alguém perguntar. */}
      <p className="mt-6 text-pretty text-muted-foreground">{howItWorks.disclaimer}</p>

      {/* Empurrão para o Commit+ */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-center">
        <p className="text-foreground">{howItWorks.nudge}</p>
        <CtaLink href="#precos" event="pricing_anchor_click" location="how_it_works" size="sm">
          {howItWorks.nudgeCta}
        </CtaLink>
      </div>
    </Section>
  )
}
