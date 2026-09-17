import SectionHeader from '@/src/components/SectionHeader'
import type { Contributor } from '@/src/lib/contributors'
import { Avatar, AvatarFallback, AvatarImage, Typography } from '@commitpt/design-system'

// ── Component ─────────────────────────────────────────────────────────────────

export default function PeopleBoard({ contributors }: { contributors: Contributor[] }) {
  // Quem mais contribuiu aparece primeiro. Sem contagem, mantém a ordem do ficheiro.
  const ordered = [...contributors].sort((a, b) => (b.contributions ?? 0) - (a.contributions ?? 0))

  return (
    <section id="people" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeader
          title="As pessoas por trás disto."
          description="Cada uma destas pessoas tem commits nos repositórios da comunidade. Os perfis são públicos."
          className="mb-12"
        />

        <ul className="grid gap-x-10 gap-y-px sm:grid-cols-2">
          {ordered.map((person) => (
            <li key={person.githubUsername} className="border-t border-border">
              <a
                href={`/u/${person.githubUsername}`}
                className="group flex items-center gap-4 py-5 transition-colors"
              >
                <Avatar variant="secondary" className="h-11 w-11 shrink-0">
                  <AvatarImage
                    src={`https://github.com/${person.githubUsername}.png`}
                    alt={person.name}
                  />
                  <AvatarFallback>{person.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <Typography
                    variant="h6"
                    as="p"
                    className="truncate transition-colors group-hover:text-primary"
                  >
                    {person.name}
                  </Typography>
                  <p className="truncate text-xs text-muted-foreground">{person.role}</p>
                </div>

                {typeof person.contributions === 'number' && (
                  <span className="shrink-0 text-right">
                    <span className="block font-mono text-sm text-foreground tabular-nums">
                      {person.contributions}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">commits</span>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
