import Section from '@/src/components/layout/Section'
import SectionHeading from '@/src/components/layout/SectionHeading'
import { faq } from '@/src/content/home'
import { Plus } from 'lucide-react'

/** `<details>` nativo: acessível e sem JS. */
export default function Faq() {
  return (
    <Section id="faq">
      <SectionHeading label={faq.label} title={faq.title} />
      <div className="divide-y divide-border border-y border-border">
        {faq.items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                size={18}
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              />
            </summary>
            <p className="pb-5 text-pretty text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
