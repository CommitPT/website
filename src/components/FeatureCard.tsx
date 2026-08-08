import type { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  variant?: string
}

export default function FeatureCard({ icon, title, description, variant }: FeatureCardProps) {
  const accentClass =
    variant === 'destructive' ? 'border-git-del/40 text-git-del' : 'border-primary/40 text-primary'

  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50 ${accentClass}`}
    >
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-foreground/5 ${accentClass}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
