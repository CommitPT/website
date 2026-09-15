import SectionHeader from '@/src/components/SectionHeader'
import { FeatureCard, Typography } from '@commitpt/design-system'
import { Briefcase, GitBranch, LucideIcon, MessageCircle, Mic, Presentation } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Happening {
  icon: LucideIcon
  title: string
  desc: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
//
// Bento 3 colunas x 2 linhas: a célula grande ocupa 2 colunas na 1ª linha,
// o resto preenche o resto exatamente (2+1 em cima, 1+1+1 em baixo).
// 5 itens, 6 posições, zero buracos.

const featured: Happening = {
  icon: MessageCircle,
  title: 'Comunidade',
  desc: 'Discussões técnicas, perguntas e networking com outras pessoas da área, todos os dias. É o que acontece entre todas as outras secções.',
}

const regular: Happening[] = [
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
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeader
          title="Uma comunidade onde as coisas acontecem."
          description="A CommitPT é uma comunidade portuguesa de Engenharia de Software. Tudo o que se segue acontece dentro dela, não são produtos separados."
          className="mb-12"
        />

        {/* Bento: célula grande (2 col) + 4 cards, grelha 3x2 exata */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-6 sm:col-span-2 flex flex-col justify-center">
            <featured.icon size={28} className="mb-4 text-primary" aria-hidden="true" />
            <Typography variant="h3" className="mb-2">
              {featured.title}
            </Typography>
            <Typography variant="p" color="muted" className="leading-relaxed">
              {featured.desc}
            </Typography>
          </div>
          {regular.map((h) => (
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
