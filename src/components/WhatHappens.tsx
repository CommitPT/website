import { FeatureCard, Typography } from '@commitpt/design-system'
import { Briefcase, GitBranch, LucideIcon, MessageCircle, Mic, Presentation } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Happening {
  icon: LucideIcon
  title: string
  desc: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const happenings: Happening[] = [
  {
    icon: MessageCircle,
    title: 'Comunidade',
    desc: 'Discussões técnicas, perguntas e networking com outras pessoas da área, todos os dias.',
  },
  {
    icon: GitBranch,
    title: 'Projetos',
    desc: 'Constrói projetos com outras pessoas usando Git, pull requests e code review.',
  },
  {
    icon: Mic,
    title: 'Talks',
    desc: 'Conversas e Q&A com recrutadores, engenheiros e profissionais da indústria.',
  },
  {
    icon: Presentation,
    title: 'Sessions',
    desc: 'Workshops e sessões técnicas organizadas por quem já está no terreno.',
  },
  {
    icon: Briefcase,
    title: 'Career',
    desc: 'Discussões sobre CVs, entrevistas, salários e progressão de carreira.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function WhatHappens() {
  return (
    <section id="happens" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="h2" className="sm:text-4xl">
            Uma comunidade onde as coisas acontecem.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            A CommitPT é uma comunidade portuguesa de Engenharia de Software. Tudo o que se segue
            acontece dentro dela, não são produtos separados.
          </Typography>
        </div>

        {/* Happenings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {happenings.map((h) => (
            <FeatureCard
              key={h.title}
              icon={<h.icon className="icon" aria-hidden="true" />}
              title={h.title}
              description={h.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
