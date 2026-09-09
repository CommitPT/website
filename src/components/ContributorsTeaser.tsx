'use client'

import ContributorCard from '@/src/components/ContributorCard'
import type { Contributor } from '@/src/lib/contributors'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  Typography,
} from '@commitpt/design-system'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const PREVIEW_COUNT = 5

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContributorsTeaser({ contributors }: { contributors: Contributor[] }) {
  const [expanded, setExpanded] = useState(false)
  const preview = contributors.slice(0, PREVIEW_COUNT)
  const remaining = contributors.length - preview.length

  return (
    <section id="people" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Content Left */}
          <div className="max-w-xl">
            <Typography variant="overline" color="secondary" as="span" className="font-mono">
              {'06 // Pessoas'}
            </Typography>
            <Typography variant="h2" className="mt-3 sm:text-4xl">
              Construído pela comunidade.
            </Typography>
            <Typography variant="p" color="muted" className="mt-4">
              A CommitPT é feita pelas pessoas que nela participam. Conhece quem está por trás dos
              projetos, das revisões de código e das sessões.
            </Typography>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className={buttonVariants({ variant: 'outline', className: 'mt-8 gap-2' })}
              aria-expanded={expanded}
            >
              {expanded ? 'Mostrar menos' : 'Ver todos os contribuidores'}
              <ChevronDown
                size={14}
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Avatars Right */}
          {!expanded && (
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {preview.map((c) => (
                <div key={c.githubUsername} className="group relative">
                  <Avatar variant="secondary" className="h-14 w-14" tooltip={c.name}>
                    <AvatarImage src={`https://github.com/${c.githubUsername}.png`} alt={c.name} />
                    <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
              {remaining > 0 && (
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-xs font-bold text-muted-foreground">
                  +{remaining}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Full Grid */}
        {expanded && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.githubUsername} contributor={contributor} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
