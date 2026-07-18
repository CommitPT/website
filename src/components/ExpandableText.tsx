'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExpandableTextProps {
  text: string
  lines?: number
  className?: string
  /** pony: controlled expand for mobile tap-to-expand on the whole card */
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

const lineClampClasses: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

export function ExpandableText({
  text,
  lines = 3,
  className = '',
  expanded: controlledExpanded,
  onExpandedChange,
}: ExpandableTextProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const expanded = controlledExpanded ?? internalExpanded
  const setExpanded = (v: boolean) => {
    setInternalExpanded(v)
    onExpandedChange?.(v)
  }
  const clampClass = lineClampClasses[lines] ?? 'line-clamp-3'

  return (
    <div className={className}>
      <p className={`text-xs leading-5 text-gray-50 ${expanded ? '' : clampClass}`}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        aria-expanded={expanded}
      >
        {expanded ? 'Ver menos' : 'Ver mais'}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  )
}
