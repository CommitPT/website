import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import { testimonials } from '@/src/content/home'

export default function Testimonials() {
  return (
    <Section id="testemunhos" width="wide">
      <SectionHeading label={testimonials.label} title={testimonials.title} />
      <ul
        data-reveal-group
        className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
      >
        {testimonials.items.map((item) => (
          <li key={item.name} data-reveal className="bg-background p-6">
            <figure className="flex h-full flex-col">
              <blockquote className="text-pretty text-foreground">“{item.quote}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                {/* TODO(copy): foto real do membro */}
                <span aria-hidden className="size-9 rounded-full bg-elevated" />
                <span>
                  <span className="block text-sm font-medium text-foreground">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
