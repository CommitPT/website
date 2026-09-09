'use client'

import Stats from '@/src/components/Stats'
import { trackEvent } from '@/src/lib/analytics'
import { DISCORD_URL } from '@/src/lib/links'
import { buttonVariants, Typography } from '@commitpt/design-system'
import { ArrowRight } from 'lucide-react'

// ── Component ─────────────────────────────────────────────────────────────────

export default function Community({ contributorsCount }: { contributorsCount: number }) {
  return (
    <section id="community" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'02 // Comunidade'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Já existe. Já está ativa.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Isto não é uma promessa de comunidade que talvez venha a existir. Todos os dias há gente
            a fazer perguntas, a partilhar o que está a construir e a ajudar-se mutuamente.
          </Typography>
        </div>

        <Stats contributorsCount={contributorsCount} />

        <div className="mt-8 flex justify-center">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' }) + ' group'}
            onClick={() => trackEvent('community_join_click', { location: 'community' })}
          >
            Entrar na Comunidade
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
