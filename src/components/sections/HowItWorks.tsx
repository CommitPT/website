import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import CtaLink from '@/src/components/ui/CtaLink'
import { howItWorks } from '@/src/content/home'
import { cx } from '@/src/lib/cx'

const [FREE_COLUMN, PLUS_COLUMN] = howItWorks.columns

/** Célula de um plano: `null` = não incluído, e lê-se como tal (não só um traço). */
function PlanCell({ value, highlight }: { value: string | null; highlight?: boolean }) {
  if (!value) {
    return (
      <>
        <span aria-hidden className="text-muted-foreground">
          —
        </span>
        <span className="sr-only">Não incluído</span>
      </>
    )
  }
  return <span className={highlight ? 'text-foreground' : 'text-muted-foreground'}>{value}</span>
}

// ── Component ─────────────────────────────────────────────────────────────────
//
// Compara os dois planos entre si — nunca a CommitPT com cursos, licenciaturas ou
// bootcamps, que dão resultados diferentes. A secção de preços fica com a decisão;
// esta fica com o detalhe.
//
// Desktop: tabela com a coluna do Commit+ destacada. Telemóvel: um cartão por linha.

export default function HowItWorks() {
  return (
    <Section id="como-funciona" width="wide">
      <SectionHeading label={howItWorks.label} title={howItWorks.title} />

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="p-4 font-mono text-xs font-normal text-muted-foreground">
                O que é
              </th>
              <th scope="col" className="w-44 p-4 font-semibold text-foreground">
                {FREE_COLUMN}
              </th>
              <th
                scope="col"
                className="w-48 bg-(--bg-accent)/10 p-4 font-semibold text-(--bg-accent)"
              >
                {PLUS_COLUMN}
              </th>
            </tr>
          </thead>
          <tbody>
            {howItWorks.rows.map((row) => (
              <tr key={row.criterion} className="border-b border-border last:border-b-0">
                <th scope="row" className="p-4 align-top font-normal">
                  <span className="block font-medium text-foreground">{row.criterion}</span>
                  <span className="mt-1 block text-muted-foreground">{row.detail}</span>
                </th>
                <td className="p-4 align-top font-mono text-xs">
                  <PlanCell value={row.free} />
                </td>
                <td className="bg-(--bg-accent)/10 p-4 align-top font-mono text-xs">
                  <PlanCell value={row.plus} highlight />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Telemóvel */}
      <ul className="space-y-4 md:hidden">
        {howItWorks.rows.map((row) => (
          <li key={row.criterion} className="rounded-lg border border-border p-5">
            <h3 className="font-medium text-foreground">{row.criterion}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded-md border border-border p-3">
                <dt className="text-muted-foreground">{FREE_COLUMN}</dt>
                <dd className="mt-1">
                  <PlanCell value={row.free} />
                </dd>
              </div>
              <div
                className={cx(
                  'rounded-md border border-(--bg-accent)/40 bg-(--bg-accent)/10 p-3',
                  !row.plus && 'opacity-60'
                )}
              >
                <dt className="text-(--bg-accent)">{PLUS_COLUMN}</dt>
                <dd className="mt-1">
                  <PlanCell value={row.plus} highlight />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Os limites, ditos por nós, antes de alguém perguntar. */}
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
