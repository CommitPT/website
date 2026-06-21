import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  initials: string
  bio: string[]
  photo?: string
  whopUrl: string
  linkedinUrl?: string
}

const members: TeamMember[] = [
  {
    name: 'Bruno Moisão',
    role: 'Fundador & Engenheiro de Software',
    initials: 'BM',
    bio: [
      'Engenheiro de Software com mais de 4 anos de experiência a construir produtos para empresas internacionais. Licenciado em Ciências da Computação pela Universidade Autónoma de Lisboa, já trabalhou em equipas distribuídas por vários países e contribuiu para produtos de larga escala em empresas tecnológicas em crescimento acelerado.',
      'Ao longo da carreira, construiu uma audiência de programadores em torno de conteúdo real sobre engenharia de software e desenvolvimento de carreira — porque a distância entre "aprender a programar" e "crescer numa carreira de engenharia real" era um problema que ninguém estava a resolver com honestidade.',
      'Fundou a CommitPT porque experienciou em primeira mão o quão mais rápido os programadores crescem quando param de trabalhar em isolamento. Tudo o que existe nesta comunidade vem do que ele desejava ter tido acesso quando estava a começar.',
    ],
    photo: '/bruno.jpg',
    whopUrl: 'https://whop.com/commitpt-709e/commit-plus',
    linkedinUrl: 'https://www.linkedin.com/in/brunomoisao',
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
          <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-border bg-ink-light">
            <span className="font-mono text-5xl font-bold text-git-add">{member.initials}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-text-primary">{member.name}</h3>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-git-add transition-colors"
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
          </div>
          <p className="mt-1 font-mono text-sm text-git-amber">{member.role}</p>
        </div>

        <div className="space-y-3 text-muted">
          {member.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={member.whopUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-git-add px-5 py-2.5 text-sm font-semibold text-ink hover:bg-[#4bc45d] transition-colors"
          >
            Entra na comunidade que o Bruno construiu
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <section id="team" className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">04 // O Fundador</span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Criado por alguém que esteve onde tu estás.
          </h2>
          <p className="mt-4 text-muted">
            Bruno não construiu a CommitPT para ter uma audiência. Construiu-a porque precisava dela
            — e não existia.
          </p>
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
