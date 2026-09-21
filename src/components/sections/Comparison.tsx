import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import CtaLink from '@/src/components/ui/CtaLink'
import { comparison } from '@/src/content/home'
import { cx } from '@/src/lib/cx'

const highlightIndex = comparison.columns.findIndex((column) => column.highlight)

// ── Component ─────────────────────────────────────────────────────────────────
//
// Desktop: tabela. Mobile: um cartão por critério com a CommitPT em destaque
// e as alternativas por baixo — 4 colunas não cabem em 375px.

export default function Comparison() {
  return (
    <Section id="comparar" width="wide">
      <SectionHeading label={comparison.label} title={comparison.title} />

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="w-40 p-4 font-mono text-xs font-normal text-muted-foreground"
              >
                Critério
              </th>
              {comparison.columns.map((column) => (
                <th
                  key={column.name}
                  scope="col"
                  className={cx(
                    'p-4 font-semibold',
                    column.highlight ? 'bg-(--bg-accent)/10 text-(--bg-accent)' : 'text-foreground'
                  )}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.criterion} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="p-4 align-top font-mono text-xs font-normal text-muted-foreground uppercase"
                >
                  {row.criterion}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={comparison.columns[i].name}
                    className={cx('p-4 align-top', i === highlightIndex && 'bg-(--bg-accent)/10')}
                  >
                    <p className="font-medium text-foreground">{cell.title}</p>
                    <p className="mt-1 text-muted-foreground">{cell.desc}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="space-y-4 md:hidden">
        {comparison.rows.map((row) => {
          const winner = row.cells[highlightIndex]
          return (
            <li key={row.criterion} className="rounded-lg border border-border p-5">
              <p className="font-mono text-xs text-muted-foreground uppercase">{row.criterion}</p>
              <div className="mt-3 rounded-md bg-(--bg-accent)/10 p-3">
                <p className="text-xs font-semibold text-(--bg-accent)">
                  {comparison.columns[highlightIndex].name}
                </p>
                <p className="mt-1 font-medium text-foreground">{winner.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{winner.desc}</p>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                {row.cells.map((cell, i) =>
                  i === highlightIndex ? null : (
                    <div key={comparison.columns[i].name} className="flex gap-2">
                      <dt className="shrink-0 text-muted-foreground">
                        {comparison.columns[i].name}:
                      </dt>
                      <dd className="text-foreground/80">{cell.title}</dd>
                    </div>
                  )
                )}
              </dl>
            </li>
          )
        })}
      </ul>

      {/* Empurrão para o Commit+ */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-center">
        <p className="text-foreground">{comparison.nudge}</p>
        <CtaLink href="#precos" event="pricing_anchor_click" location="comparison" size="sm">
          {comparison.nudgeCta}
        </CtaLink>
      </div>
    </Section>
  )
}
