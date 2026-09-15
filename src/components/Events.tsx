import SectionHeader from '@/src/components/SectionHeader'
import { Separator, Typography } from '@commitpt/design-system'
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
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeader
          title="Aprende com quem já está no terreno."
          description="Sessões ao vivo, pelo menos 4 vezes por mês, em três formatos recorrentes."
          className="mb-12"
        />

        {/* Formatos de evento: lista vertical com hairlines, não cards */}
        <div>
          {formats.map((f, i) => (
            <div key={f.label}>
              {i > 0 && <Separator className="my-0" />}
              <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                  <f.icon size={22} className={`shrink-0 ${f.accent}`} aria-hidden="true" />
                  <span className={`font-mono text-xs ${f.accent}`}>{f.label}</span>
                </div>
                <div>
                  <Typography variant="h3" className="text-xl sm:text-2xl">
                    {f.name}
                  </Typography>
                  <Typography variant="p" color="muted" className="mt-2 max-w-2xl leading-relaxed">
                    {f.desc}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
