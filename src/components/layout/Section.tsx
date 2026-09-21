import CrossMark from '@/src/components/layout/CrossMark'
import FrameRule from '@/src/components/layout/FrameRule'
import { cx } from '@/src/lib/cx'
import type { ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type SectionWidth = 'content' | 'wide'

interface SectionProps {
  id?: string
  /**
   * `content` — conteúdo centrado numa coluna estreita (texto, cartões).
   * `wide` — conteúdo ocupa a moldura toda (hero, tabela comparativa).
   */
  width?: SectionWidth
  /** Sem padding interior — para secções que encostam às bordas da moldura (hero). */
  bleed?: boolean
  /** Classes extra para o contentor interior (fundo, alinhamento). */
  className?: string
  children: ReactNode
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Section({
  id,
  width = 'content',
  bleed = false,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className="relative scroll-mt-20">
      <div
        className={cx(
          'relative mx-auto',
          width === 'content' ? 'max-w-content' : 'max-w-wide',
          !bleed && 'px-5 py-16 sm:px-8 md:py-24',
          className
        )}
      >
        {children}
      </div>
      <CrossMark className="-bottom-1 -left-[5px]" />
      <CrossMark className="-right-[5px] -bottom-1" />
      <FrameRule />
    </section>
  )
}
