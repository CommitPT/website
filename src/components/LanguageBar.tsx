import type { ProjectLanguage } from '@/src/data/projects'

// ── Constants ─────────────────────────────────────────────────────────────────

/**
 * Cada linguagem tem uma cor fixa, tirada dos tokens do design system. Fixa
 * porque a mesma linguagem tem de se ler igual em todos os projetos: é o que
 * torna a barra comparável de repo para repo.
 */
const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: 'bg-primary',
  JavaScript: 'bg-warning',
  CSS: 'bg-secondary',
  PLpgSQL: 'bg-syntax-green',
  Dockerfile: 'bg-syntax-blue',
}

const FALLBACK_COLOR = 'bg-muted-foreground/40'

function colorFor(name: string): string {
  return LANGUAGE_COLOR[name] ?? FALLBACK_COLOR
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LanguageBar({ languages }: { languages: ProjectLanguage[] }) {
  const label = languages.map((l) => `${l.name} ${l.percent}%`).join(', ')

  return (
    <div>
      <div
        className="flex h-1 w-full gap-0.5 overflow-hidden rounded-full"
        role="img"
        aria-label={`Distribuição de linguagens: ${label}`}
      >
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={colorFor(lang.name)}
            style={{ width: `${lang.percent}%` }}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {languages.map((lang) => (
          <li key={lang.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`h-2 w-2 shrink-0 rounded-full ${colorFor(lang.name)}`} />
            <span>{lang.name}</span>
            <span className="font-mono text-foreground">{lang.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
