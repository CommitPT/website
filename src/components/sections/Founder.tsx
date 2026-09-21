import Section from '@/src/components/layout/Section'
import SectionLabel from '@/src/components/layout/SectionLabel'
import { founder } from '@/src/content/home'
import { Typography } from '@commitpt/design-system'

export default function Founder() {
  return (
    <Section id="quem" width="wide">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel>{founder.label}</SectionLabel>
          <Typography variant="h2" className="mt-4 tracking-tight text-balance">
            {founder.title}
          </Typography>
          <div className="mt-6 space-y-4">
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* TODO(copy): foto real (fundador / sessão ao vivo) */}
        <div className="gradient-panel flex aspect-[4/5] items-end rounded-lg border border-border p-5 sm:aspect-[4/3] lg:aspect-[4/5]">
          <span className="relative z-10 font-mono text-xs tracking-widest text-foreground/70 uppercase">
            Foto em breve
          </span>
        </div>
      </div>
    </Section>
  )
}
