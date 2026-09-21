import { cx } from '@/src/lib/cx'

interface CrossMarkProps {
  /** Posição absoluta, ex.: `-bottom-1 -left-1`. */
  className: string
}

/** Pequeno "+" onde as linhas horizontais cruzam as bordas da moldura (só em lg+). */
export default function CrossMark({ className }: CrossMarkProps) {
  return (
    <span
      aria-hidden
      className={cx('pointer-events-none absolute z-10 hidden size-[9px] lg:block', className)}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-(--bg-accent)" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-(--bg-accent)" />
    </span>
  )
}
