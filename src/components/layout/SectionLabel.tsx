import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

/** Pílula mono por cima do título de cada secção (ex.: "A escolha certa"). */
export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-(--bg-accent)" />
      {children}
    </span>
  )
}
