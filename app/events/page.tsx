import type { Metadata } from 'next'
import { ArrowRight, CalendarDays, LockKeyhole, Users } from 'lucide-react'
import { buttonVariants, Typography } from '@commitpt/design-system'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import { events } from '@/src/data/events'

const WHOP_URL = 'https://whop.com/commitpt-709e/commit-plus'
const DISCORD_URL = 'https://discord.gg/yGAbprCBrT'
const frequencyLabels = { weekly: 'Semanal', monthly: 'Mensal' } as const

export const metadata: Metadata = {
  title: 'Eventos — CommitPT',
  description:
    'Eventos semanais e mensais da CommitPT para programadores construírem, partilharem e evoluírem juntos.',
  alternates: { canonical: 'https://www.commitpt.com/events' },
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <Typography variant="small" color="secondary" as="span" className="font-mono">
              {'// Eventos'}
            </Typography>
            <Typography variant="h1" className="mt-3 max-w-3xl sm:text-5xl">
              Menos scroll. Mais shipping.
            </Typography>
            <Typography variant="large" color="muted" className="mt-5 max-w-2xl">
              Entra nas sessões que mantêm os teus projetos em movimento. Há eventos abertos a toda
              a comunidade e experiências exclusivas para membros Commit+.
            </Typography>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Typography variant="h2">A agenda da comunidade</Typography>
              <Typography variant="small" color="muted" className="mt-2">
                Escolhe o próximo evento e aparece no Discord.
              </Typography>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <CalendarDays className="icon-xs text-primary" aria-hidden="true" />
              <span>{events.length} eventos recorrentes</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event, index) => {
              const isCommitPlus = event.access === 'Commit+'
              const participationUrl = isCommitPlus ? WHOP_URL : DISCORD_URL

              return (
                <article
                  key={event.title}
                  className="group flex min-h-72 flex-col justify-between border border-border bg-surface p-6 transition-colors hover:border-primary"
                >
                  <div>
                    <div className="mb-8 flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
                      <span className="text-primary">{`0${index + 1} //`}</span>
                      <span
                        className={
                          isCommitPlus
                            ? 'inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-secondary'
                            : 'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1'
                        }
                      >
                        {isCommitPlus ? (
                          <LockKeyhole className="icon-xxs" aria-hidden="true" />
                        ) : (
                          <Users className="icon-xxs" aria-hidden="true" />
                        )}
                        {event.access}
                      </span>
                    </div>
                    <Typography variant="h3">{event.title}</Typography>
                    <Typography variant="p" color="muted" className="mt-3 max-w-lg">
                      {event.description}
                    </Typography>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-4">
                    <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      {frequencyLabels[event.frequency]}
                    </span>
                    <a
                      href={participationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ size: 'sm' })}
                    >
                      Participar
                      <ArrowRight className="icon-xs transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="border border-primary/30 bg-primary/[0.06] p-8 sm:p-10">
              <Typography variant="small" color="secondary" as="span" className="font-mono">
                {'// Próximo passo'}
              </Typography>
              <Typography variant="h2" className="mt-3 max-w-2xl">
                O teu próximo commit começa com uma conversa.
              </Typography>
              <Typography variant="p" color="muted" className="mt-4 max-w-xl">
                Junta-te ao Discord para acompanhar os eventos gratuitos ou entra no Commit+ para
                teres acesso a todas as sessões.
              </Typography>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHOP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: 'lg' })}
                >
                  Entrar no Commit+
                  <ArrowRight className="icon-xs" />
                </a>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  Entrar no Discord
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
