import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import { benefits, type Tier } from '@/src/content/home'
import { cx } from '@/src/lib/cx'

const TIER_TAG: Record<Tier, { label: string; className: string }> = {
  free: { label: 'Grátis', className: 'border-border text-muted-foreground' },
  plus: { label: 'Commit+', className: 'border-(--bg-accent)/40 text-(--bg-accent)' },
}

export default function Benefits() {
  return (
    <Section id="beneficios">
      <SectionHeading label={benefits.label} title={benefits.title} />
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {benefits.items.map((item) => {
          const tag = TIER_TAG[item.tier]
          return (
            <li key={item.title} className="flex flex-col bg-background p-6">
              <span
                className={cx(
                  'self-start rounded-full border px-2.5 py-0.5 font-mono text-[11px]',
                  tag.className
                )}
              >
                {tag.label}
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              <p className="mt-auto pt-5 font-mono text-xs text-foreground/70">{item.proof}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
