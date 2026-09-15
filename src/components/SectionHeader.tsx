import { Typography } from '@commitpt/design-system'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  /** `left` (default) fills the available width; `center` narrows and centers it. */
  align?: 'left' | 'center'
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Shared section header: optional eyebrow, title, optional description.
 * Keep eyebrows rare — at most a couple per page — so they still mean something.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const wrapClass = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'

  return (
    <div className={`${wrapClass} ${className}`.trim()}>
      {eyebrow && (
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h2" className={eyebrow ? 'mt-3 sm:text-4xl' : 'sm:text-4xl'}>
        {title}
      </Typography>
      {description && (
        <Typography variant="p" color="muted" className="mt-4">
          {description}
        </Typography>
      )}
    </div>
  )
}
