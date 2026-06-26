import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import ContributorCard, { type Contributor } from '@/src/components/ContributorCard'
import contributorsData from '@/src/contributors.json'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contribuidores — CommitPT',
  description:
    'Conhece as pessoas que contribuem ativamente para a comunidade CommitPT. Engenheiros de software portugueses a construir em público.',
  alternates: {
    canonical: 'https://www.commitpt.com/contributors',
  },
}

const contributors: Contributor[] = contributorsData

export default function ContributorsPage() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <span className="font-mono text-sm font-bold text-git-amber">
              {'// Contribuidores'}
            </span>
            <h1 className="mt-3 text-4xl font-bold text-text-primary sm:text-5xl">
              Quem faz a CommitPT acontecer.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              A CommitPT tem mais de 20 contribuidores ativos. Abaixo encontras os principais —
              pessoas que dedicam o seu tempo, conhecimento e energia para que esta comunidade seja
              melhor para todos.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-ink-light px-3 py-1 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-git-add opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-git-add"></span>
              </span>
              20+ contribuidores ativos
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <p className="mb-8 font-mono text-sm text-muted">
            A mostrar os <span className="text-git-add">top {contributors.length}</span>{' '}
            contribuidores
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.githubUsername} contributor={contributor} />
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-ink-light">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
            <span className="font-mono text-sm font-bold text-git-amber">
              {'// Junta-te a nós'}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              Queres aparecer aqui?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Entra na comunidade, começa a contribuir, e passa a fazer parte de quem constrói a
              CommitPT.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://whop.com/commitpt-709e/commit-plus"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-git-add px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#4bc45d]"
              >
                Entrar no Whop
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://discord.gg/yGAbprCBrT"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-git-add hover:text-git-add"
              >
                Entrar no Discord
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
