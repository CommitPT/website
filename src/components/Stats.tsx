interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '200+', label: 'membros ativos' },
  { value: '10+', label: 'profissionais da área' },
  { value: '4+', label: 'sessões ao vivo por mês' },
  { value: '5+', label: 'anos de experiência' },
]

export default function Stats() {
  return (
    <div className="border-b border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-6 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-4 text-center ${i === 0 ? 'px-0 sm:px-6' : 'px-6'}`}>
              <p className="font-mono text-3xl font-bold text-git-add">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
