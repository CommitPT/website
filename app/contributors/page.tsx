import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import ContributorCard, { type Contributor } from '@/src/components/ContributorCard'
import contributorsData from '@/src/contributors.json'
import { ArrowRight } from 'lucide-react'
import { buttonVariants, Typography } from '@commitpt/design-system'

export const metadata: Metadata = {
  title: 'Contribuidores — CommitPT',
  description:
    'Os programadores que tornam a CommitPT possível. Mais de 20 contribuidores ativos a partilhar conhecimento, fazer code reviews e construir em público.',
  alternates: {
    canonical: 'https://www.commitpt.com/contributors',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.commitpt.com/contributors',
    title: 'Contribuidores — CommitPT',
    description:
      'Os programadores que tornam a CommitPT possível. Mais de 20 contribuidores ativos a partilhar conhecimento, fazer code reviews e construir em público.',
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'Contribuidores — CommitPT',
    description:
      'Os programadores que tornam a CommitPT possível. Mais de 20 contribuidores ativos a partilhar conhecimento, fazer code reviews e construir em público.',
    images: ['/commit_3_512w.webp'],
  },
}

const contributors: Contributor[] = contributorsData

export default function ContributorsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <Typography variant="overline" color="secondary" as="span" className="font-mono">
              {'// Contribuidores'}
            </Typography>
            <Typography variant="h1" className="mt-3 sm:text-5xl">
              As pessoas por trás da CommitPT.
            </Typography>
            <Typography variant="large" color="muted" className="mt-5 max-w-2xl">
              Mais de 20 programadores que contribuem ativamente — com code reviews, workshops,
              sessões de co-working e muito mais. Aqui podes conhecê-los, ver o seu trabalho e
              contactá-los diretamente.
            </Typography>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              20+ contribuidores ativos
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <Typography variant="small" color="muted" className="mb-8 font-mono">
            A mostrar os <span className="text-primary">top {contributors.length}</span>{' '}
            contribuidores
          </Typography>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.githubUsername} contributor={contributor} />
            ))}
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
            <Typography variant="overline" color="secondary" as="span" className="font-mono">
              {'// Junta-te a nós'}
            </Typography>
            <Typography variant="h2" className="mt-3 sm:text-4xl">
              Queres aparecer aqui?
            </Typography>
            <Typography variant="p" color="muted" className="mx-auto mt-4 max-w-xl">
              Entra na comunidade e começa a contribuir. Simples assim.
            </Typography>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://whop.com/commitpt-709e/commit-plus"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: 'lg' }) + ' w-full sm:w-auto justify-center'}
              >
                Adere ao Commit+
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://discord.gg/yGAbprCBrT"
                target="_blank"
                rel="noreferrer"
                className={
                  buttonVariants({ variant: 'outline', size: 'lg' }) +
                  ' w-full sm:w-auto justify-center'
                }
              >
                Experimenta o Discord Grátis
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
