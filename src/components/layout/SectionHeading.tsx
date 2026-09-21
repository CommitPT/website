import SectionLabel from '@/src/components/layout/SectionLabel'
import { Typography } from '@commitpt/design-system'

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
}

/** Pílula + título (+ subtítulo) centrados no topo de cada secção. */
export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
      <SectionLabel>{label}</SectionLabel>
      <Typography variant="h2" className="tracking-tight text-balance">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="p" color="muted" className="text-pretty">
          {subtitle}
        </Typography>
      )}
    </div>
  )
}
