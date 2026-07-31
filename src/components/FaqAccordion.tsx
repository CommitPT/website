'use client'

import { FAQ, type FAQItem } from '@commitpt/design-system'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FaqAccordionProps {
  items: FAQItem[]
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return <FAQ items={items} />
}
