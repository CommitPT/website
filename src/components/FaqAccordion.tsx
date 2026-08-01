'use client'

import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface FaqItem {
  question: string
  answer: ReactNode
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question} className="rounded-lg border border-border bg-surface/70">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-foreground">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen ? (
              <div className="px-6 pb-6 text-sm leading-7 text-muted-foreground">{item.answer}</div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
