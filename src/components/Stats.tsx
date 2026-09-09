import { Typography } from '@commitpt/design-system'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stat {
  value: string
  label: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Stats({ contributorsCount }: { contributorsCount: number }) {
  const stats: Stat[] = [
    { value: '550+', label: 'membros na comunidade' },
    { value: `${contributorsCount}+`, label: 'contribuidores de projetos' },
    { value: '4+', label: 'sessões ao vivo por mês' },
    { value: '90 mil+', label: 'mensagens enviadas' },
  ]

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-border">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-4 text-center ${i >= 2 ? 'border-t border-border sm:border-t-0' : ''}`}
            >
              <Typography variant="h3" className="font-mono" color="primary" as="p">
                {s.value}
              </Typography>
              <Typography variant="small" color="muted" className="mt-1">
                {s.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
