'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button, Typography } from '@commitpt/design-system'

interface FaqItem {
  q: string
  a: React.ReactNode
}

const faqs: FaqItem[] = [
  {
    q: 'A comunidade é só para programadores experientes?',
    a: (
      <>
        <p>
          Não. A CommitPT tem membros em todos os níveis — desde estudantes e programadores em
          início de carreira até engenheiros com anos de experiência em empresas internacionais.
        </p>
        <p>
          Isso é precisamente o que torna a comunidade útil. Quando tens dúvidas, há alguém que já
          passou pelo mesmo. Quando já sabes alguma coisa, partilhares esse conhecimento também te
          faz crescer.
        </p>
        <p>
          O único requisito é teres vontade de aprender e de contribuir para o crescimento dos
          outros.
        </p>
      </>
    ),
  },
  {
    q: 'O que encontro dentro da comunidade?',
    a: (
      <>
        <p>
          A CommitPT não é um curso. É um ambiente onde o crescimento acontece através da interação,
          da colaboração e de projetos reais.
        </p>
        <p>Dentro da comunidade encontras, entre outras coisas:</p>
        <ul className="mt-2 space-y-1 list-none">
          {[
            'Workshops práticos sobre temas técnicos e de carreira',
            'Calls semanais ao vivo com outros membros',
            'Revisões de código e feedback honesto',
            'Discussões técnicas sobre arquitetura, ferramentas e boas práticas',
            'Projetos internos onde podes colaborar com outros membros',
            'Recursos e materiais curados por profissionais da área',
            'Contacto direto com engenheiros experientes',
            'Uma comunidade ativa onde podes fazer perguntas sem julgamentos',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-mono text-primary shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: 'Quanto tempo preciso de dedicar por semana?',
    a: (
      <>
        <p>Não há um mínimo obrigatório. Cada pessoa participa ao seu próprio ritmo.</p>
        <p>
          Há membros que entram todos os dias, outros que aparecem algumas vezes por semana. O que
          retiras da comunidade está diretamente relacionado com o que investes — mas essa decisão é
          sempre tua.
        </p>
        <p>
          O importante é que quando precisares de feedback, de uma perspetiva diferente ou apenas de
          ver o que outros estão a construir, a comunidade está lá.
        </p>
      </>
    ),
  },
  {
    q: 'Como funcionam as calls e workshops?',
    a: (
      <>
        <p>
          São sessões ao vivo, com foco em temas práticos. Não há apresentações genéricas — o
          objetivo é sempre aprender algo que possas aplicar.
        </p>
        <p>Os temas variam consoante o que a comunidade precisa naquele momento:</p>
        <ul className="mt-2 space-y-1 list-none">
          {[
            'Discussões técnicas e de arquitetura',
            'Revisões de código em projetos reais',
            'Temas de carreira — entrevistas, negociação, progressão',
            'Sessões de Q&A com engenheiros experientes',
            'Walkthroughs de projetos dos próprios membros',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-mono text-primary shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          A participação é sempre opcional. As sessões ficam gravadas para quem não conseguir estar
          presente.
        </p>
      </>
    ),
  },
  {
    q: 'Como sei se esta comunidade é para mim?',
    a: (
      <>
        <p>
          A CommitPT não é para toda a gente — e isso é intencional. É para pessoas que gostam de
          aprender, de construir coisas, de fazer perguntas e de partilhar o que sabem.
        </p>
        <p>
          Se tens curiosidade genuína, se queres crescer como engenheiro a longo prazo, e se estás
          disposto a contribuir para o crescimento dos outros, vais sentir-te em casa.
        </p>
        <p>
          Se procuras motivação rápida ou conteúdo para consumir passivamente, provavelmente não é o
          sítio certo.
        </p>
      </>
    ),
  },
  {
    q: 'Qual é a diferença entre a comunidade gratuita e o Commit+?',
    a: (
      <>
        <p>
          A comunidade gratuita no Discord <strong>vai continuar a existir sempre</strong>. Podes
          entrar, fazer perguntas, conhecer pessoas e participar nas discussões sem pagar nada.
        </p>
        <p>O Commit+ adiciona uma camada extra para quem quer ir mais fundo:</p>
        <ul className="mt-2 space-y-1 list-none">
          {[
            'Workshops práticos e calls ao vivo exclusivas',
            'Acesso a recursos e materiais premium',
            'Participação em projetos internos da comunidade',
            'Interação mais próxima com a equipa e membros seniores',
            'Mais oportunidades de aprender com outros membros',
            'Acesso antecipado à plataforma que estamos a construir',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-mono text-primary shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: 'Porque é que o Commit+ é pago?',
    a: (
      <>
        <p>
          O objetivo não é monetizar o acesso à comunidade. O objetivo é{' '}
          <strong>tornar o projeto sustentável</strong> para que possa continuar a crescer.
        </p>
        <p>
          Organizar workshops com qualidade, manter recursos atualizados, desenvolver a plataforma e
          investir em iniciativas para a comunidade tem custos reais. O Commit+ é o que torna isso
          possível.
        </p>
        <p>
          Nenhum membro paga para ter acesso a uma comunidade — paga para ajudar a construir algo
          que beneficia todos, incluindo ele próprio.
        </p>
      </>
    ),
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: (
      <>
        <p>Sim. Sem contratos, sem compromissos a longo prazo.</p>
        <p>
          O Commit+ funciona como uma <strong>subscrição mensal simples</strong>. Podes cancelar a
          qualquer momento, diretamente na plataforma, sem precisares de falar com ninguém.
        </p>
      </>
    ),
  },
  {
    q: 'E se não gostar?',
    a: (
      <>
        <p>Podes experimentar e sair quando quiseres. Não há pressão nem complicações.</p>
        <p>
          Se entras, participas durante um mês e decides que não é para ti, cancelas e pronto. Não
          te pedimos justificações nem tentamos convencer-te a ficar.
        </p>
        <p>
          O que esperamos é que proves a ti próprio que vale a pena — e que fiques porque sentes
          valor, não porque te esqueceste de cancelar.
        </p>
      </>
    ),
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const id = useId()

  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            07 // Perguntas Frequentes
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Tens dúvidas. Temos respostas.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Se ainda tens alguma questão antes de entrares, é provável que esteja aqui.
          </Typography>
        </div>
        <div className="max-w-3xl">
          <div className="rounded-lg border border-border bg-elevated shadow-xl shadow-black/40">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              const isFirst = i === 0
              const isLast = i === faqs.length - 1
              const buttonId = `${id}-faq-btn-${i}`
              const panelId = `${id}-faq-panel-${i}`

              return (
                <div key={i} className={i > 0 ? 'border-t border-border' : ''}>
                  <Button
                    id={buttonId}
                    variant="ghost"
                    className={`group w-full h-auto justify-between px-6 py-5 text-left transition-colors items-start rounded-none ${
                      isFirst ? 'rounded-t-lg' : ''
                    } ${isLast && !isOpen ? 'rounded-b-lg' : ''}`}
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="whitespace-normal text-wrap pr-4 group-hover:text-foreground transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`ml-auto mt-0.5 shrink-0 transition-transform duration-200 group-hover:text-foreground ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="space-y-3 px-6 pb-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
