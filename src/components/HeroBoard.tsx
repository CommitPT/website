'use client'

import type { Contributor } from '@/src/lib/contributors'
import { trackEvent } from '@/src/lib/analytics'
import { DISCORD_URL } from '@/src/lib/links'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  Typography,
} from '@commitpt/design-system'
import { ArrowRight } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface HeroBoardProps {
  contributors: Contributor[]
  commitPlusCount: number | null
}

interface BoardRow {
  value: string
  label: string
}

const FACES_SHOWN = 8

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroBoard({ contributors, commitPlusCount }: HeroBoardProps) {
  const faces = contributors.slice(0, FACES_SHOWN)
  const remaining = contributors.length - faces.length

  const rows: BoardRow[] = [
    { value: '550+', label: 'membros na comunidade' },
    { value: `${contributors.length}`, label: 'contribuidores nos repositórios' },
    { value: '90 mil+', label: 'mensagens enviadas' },
    { value: '4+', label: 'sessões ao vivo por mês' },
    ...(commitPlusCount !== null
      ? [{ value: `${commitPlusCount}`, label: 'membros no Commit+' }]
      : []),
  ]

  return (
    <section id="hero" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        {/* Proposta de valor */}
        <div>
          <Typography
            variant="h1"
            className="text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          >
            Deixa de programar sozinho.
          </Typography>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
            Developers portugueses a fazer perguntas, rever código uns dos outros e construir
            projetos em conjunto. A entrada é gratuita.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' }) + ' group'}
              onClick={() => trackEvent('hero_join_click', { destination: 'discord' })}
            >
              Entrar Gratuitamente
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver o que a comunidade construiu
            </a>
          </div>
        </div>

        {/* Quadro de números. Substitui o terminal falso: os dados são reais, os
            contribuidores vêm do GitHub e a contagem do Commit+ vem do Whop. */}
        <div className="rounded-xl border border-border bg-surface">
          <div className="divide-y divide-border">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="font-mono text-2xl font-semibold text-foreground tabular-nums">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-6 py-5">
            <div className="flex flex-wrap items-center gap-2">
              {faces.map((c) => (
                <a
                  key={c.githubUsername}
                  href={`/u/${c.githubUsername}`}
                  aria-label={`Perfil de ${c.name}`}
                  className="transition-opacity hover:opacity-80"
                >
                  <Avatar variant="secondary" className="h-9 w-9" tooltip={c.name}>
                    <AvatarImage src={`https://github.com/${c.githubUsername}.png`} alt={c.name} />
                    <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </a>
              ))}
              {remaining > 0 && (
                <span className="font-mono text-xs text-muted-foreground">+{remaining}</span>
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Pessoas reais com contribuições nos repositórios da comunidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
