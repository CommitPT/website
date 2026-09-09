'use client'

import type { BillingCycle } from '@/src/components/PricingDisplay'

export interface BillingToggleProps {
  billing: BillingCycle
  onChange: (billing: BillingCycle) => void
  className?: string
}

export default function BillingToggle({ billing, onChange, className = '' }: BillingToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Ciclo de faturação"
      className={`inline-flex items-center rounded-full border border-border bg-surface p-1 font-mono text-sm ${className}`}
    >
      <button
        type="button"
        role="tab"
        aria-selected={billing === 'monthly'}
        onClick={() => onChange('monthly')}
        className={`rounded-full px-4 py-1.5 transition-colors ${
          billing === 'monthly'
            ? 'bg-gradient-to-b from-primary-500 to-primary-600 text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Mensal
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={billing === 'annual'}
        onClick={() => onChange('annual')}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors ${
          billing === 'annual'
            ? 'bg-gradient-to-b from-primary-500 to-primary-600 text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Anual
        <span
          className={`rounded-full px-1.5 py-0.5 text-xs ${
            billing === 'annual' ? 'bg-background/20' : 'bg-primary-500/10 text-primary-500'
          }`}
        >
          Poupa 50%
        </span>
      </button>
    </div>
  )
}
