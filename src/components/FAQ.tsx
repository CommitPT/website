'use client'

import { MessageCircle } from 'lucide-react'
import {
  FAQ as FAQAccordion,
  Typography,
  buttonVariants,
  type FAQItem as FAQAccordionItem,
} from '@commitpt/design-system'
import { blocksToPlainText, type Block, type FaqItem } from '@/src/data/faqs'
import { DISCORD_URL } from '@/src/lib/links'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FaqSectionProps {
  /** Section eyebrow label, including the page's own section number. */
  eyebrow: string
  heading: string
  description: string
  /**
   * FAQ entries to show. The accordion and the JSON-LD both derive from this
   * one list, so the structured data always describes what is on the page.
   */
  items: FaqItem[]
  /**
   * Emit FAQPage JSON-LD. Turn off on pages that reuse questions already
   * claimed elsewhere — the same Q&A should only be marked up once per site.
   */
  withSchema?: boolean
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

function renderBlocks(blocks: Block[]) {
  return blocks.map((block, i) =>
    block.type === 'list' ? (
      <ul key={i} className="list-none space-y-1">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="font-mono text-primary shrink-0">+</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p key={i}>{renderInline(block.text)}</p>
    )
  )
}

function buildSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlainText(faq.blocks),
      },
    })),
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQ({
  eyebrow,
  heading,
  description,
  items,
  withSchema = true,
}: FaqSectionProps) {
  const accordionItems: FAQAccordionItem[] = items.map((faq) => ({
    question: faq.q,
    answer: <div className="space-y-3">{renderBlocks(faq.blocks)}</div>,
  }))

  return (
    <section id="faq" className="border-t border-border">
      {/* Schema Markup */}
      {withSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(items)) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {eyebrow}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            {heading}
          </Typography>
          <Typography variant="p" color="muted" className="mt-5">
            {description}
          </Typography>
        </div>

        {/* FAQ Accordion */}
        <FAQAccordion items={accordionItems} />

        {/* Discord CTA Box */}
        <div className="mt-12 rounded-lg border border-border bg-surface p-8 text-center lg:p-12">
          <Typography variant="h3" className="sm:text-3xl">
            Não encontraste a tua resposta?
          </Typography>
          <Typography variant="p" color="muted" className="mx-auto mt-3 max-w-xl">
            Entra no Discord e pergunta diretamente à comunidade respondemos rápido.
          </Typography>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'gap-2 text-primary-300',
              })}
            >
              <MessageCircle size={16} />
              Perguntar no Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
