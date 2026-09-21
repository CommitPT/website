import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import { forWho } from '@/src/content/home'

export default function ForWho() {
  return (
    <Section id="para-quem" width="wide">
      <SectionHeading label={forWho.label} title={forWho.title} />
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {forWho.profiles.map((profile, i) => (
          <li key={profile.title} className="bg-background p-6">
            <span className="font-mono text-xs text-(--bg-accent)">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-semibold text-foreground">{profile.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{profile.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
