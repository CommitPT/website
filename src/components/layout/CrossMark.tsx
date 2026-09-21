import { cx } from '@/src/lib/cx'

interface CrossMarkProps {
  /** Posição absoluta, ex.: `-bottom-1 -left-1`. */
  className: string
}

/**
 * Pequeno "+" onde as linhas horizontais cruzam as bordas da moldura (só em lg+).
 * Traços em píxeis inteiros (4px de cada lado) para não ficarem desfocados.
 */
export default function CrossMark({ className }: CrossMarkProps) {
  return (
    <span
      aria-hidden
      className={cx('pointer-events-none absolute z-10 hidden size-[9px] lg:block', className)}
    >
      <span className="absolute top-[4px] left-0 h-px w-full bg-(--bg-accent)" />
      <span className="absolute top-0 left-[4px] h-full w-px bg-(--bg-accent)" />
    </span>
  )
}
