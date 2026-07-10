'use client'

import { Button, Typography } from '@commitpt/design-system'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  initials: string
  bio: string[]
  photo?: string
  whopUrl: string
  linkedinUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
}

const members: TeamMember[] = [
  {
    name: 'Bruno Moisão',
    role: 'Fundador & Engenheiro de Software',
    initials: 'BM',
    bio: [
      'Engenheiro de Software com mais de 4 anos de experiência a desenvolver produtos utilizados por milhares de utilizadores em empresas internacionais. Licenciado em Engenharia Informática pela Universidade Autónoma de Lisboa, trabalhou em equipas distribuídas por vários países e participou no desenvolvimento de produtos tecnológicos em ambientes de elevada exigência.',
      'Ao longo dos últimos anos, partilhou conhecimento sobre Engenharia de Software e desenvolvimento de carreira nas redes sociais, reunindo uma comunidade com mais de 18.000 seguidores. Através dos seus conteúdos, ajudou milhares de programadores a preparar entrevistas, evoluir tecnicamente e tomar melhores decisões na carreira.',
      'Em 2025 fundou a CommitPT, uma comunidade portuguesa dedicada à Engenharia de Software que reúne centenas de programadores de diferentes níveis de experiência. O objetivo nunca foi criar mais um servidor de Discord ou vender um curso, mas sim construir um espaço onde as pessoas possam aprender em conjunto, receber feedback, colaborar em projetos e crescer mais depressa do que cresceriam sozinhas.',
      'Hoje, a CommitPT é a materialização daquilo que sentiu faltar quando estava no início da carreira: uma comunidade ativa, com pessoas experientes, focada na prática, na colaboração e na evolução contínua.',
    ],
    photo: '/bruno_560w.webp',
    whopUrl: 'https://whop.com/commitpt-709e/commit-plus',
    linkedinUrl: 'https://www.linkedin.com/in/brunomoisao',
    instagramUrl: 'https://www.instagram.com/brumoisao/',
    tiktokUrl: 'https://www.tiktok.com/@brumoisao2',
  },
]

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
      <div className="mx-auto w-full max-w-[280px] lg:mx-0">
        {member.photo ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border">
            <Image src={member.photo} alt={member.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-border bg-surface">
            <span className="font-mono text-5xl font-bold text-primary">{member.initials}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <Typography variant="h3">{member.name}</Typography>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {member.instagramUrl && (
              <a
                href={member.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {member.tiktokUrl && (
              <a
                href={member.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
            )}
          </div>
          <Typography variant="small" color="secondary" className="mt-1 font-mono">
            {member.role}
          </Typography>
        </div>

        <div className="space-y-3 text-muted-foreground">
          {member.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="flex justify-center lg:justify-start pt-2">
          <Button onClick={() => window.open(member.whopUrl, '_blank')}>
            Entra na comunidade que o Bruno construiu
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <section id="team" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            04 // O Fundador
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Criado por alguém que esteve onde tu estás.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Bruno não construiu a CommitPT para ter uma audiência. Construiu-a porque precisava dela
            — e não existia.
          </Typography>
        </div>

        <div className="space-y-16">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
