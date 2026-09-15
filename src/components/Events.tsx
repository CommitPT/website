import { Typography } from '@commitpt/design-system'
import { Briefcase, LucideIcon, Mic, Presentation } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface EventFormat {
  icon: LucideIcon
  label: string
  name: string
  desc: string
  accent: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
//
// Formatos recorrentes da comunidade — sem datas ou speakers fixos aqui, para
// não fabricar dados que não existem. Quando houver um calendário de eventos
// real, esta secção passa a listar instâncias concretas.

const formats: EventFormat[] = [
  {
    icon: Mic,
    label: 'Commit Talk',
    name: 'Conversas com a indústria',
    desc: 'Q&A com recrutadores, engenheiros e profissionais de diferentes áreas. Acesso direto a quem conhece o mercado por dentro.',
    accent: 'text-syntax-purple',
  },
  {
    icon: Presentation,
    label: 'Commit Session',
    name: 'Sessões técnicas',
    desc: 'Workshops conduzidos por membros com experiência numa área específica: frontend, backend, cloud, AI, system design.',
    accent: 'text-syntax-blue',
  },
  {
    icon: Briefcase,
    label: 'Commit Career',
    name: 'Carreira',
    desc: 'Discussões sobre CVs, processos de entrevista, salários e progressão, com quem já passou pelo processo.',
    accent: 'text-syntax-green',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Events() {
  return (
    <section id="events" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="h2" className="sm:text-4xl">
            Aprende com quem já está no terreno.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Sessões ao vivo, pelo menos 4 vezes por mês, em três formatos recorrentes.
          </Typography>
        </div>

        {/* Event Format Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {formats.map((f) => (
            <div
              key={f.label}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <f.icon size={22} className={`mb-4 ${f.accent}`} aria-hidden="true" />
              <span className={`font-mono text-xs ${f.accent}`}>{f.label}</span>
              <Typography variant="h4" className="mt-2 text-lg">
                {f.name}
              </Typography>
              <Typography variant="small" color="muted" className="mt-2 leading-relaxed">
                {f.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
