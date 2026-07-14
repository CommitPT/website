'use client'

import { useId, useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { Button, buttonVariants, Typography } from '@commitpt/design-system'

type Block = { type: 'p'; text: string } | { type: 'list'; items: string[] }

interface FaqItem {
  q: string
  blocks: Block[]
}

const faqs: FaqItem[] = [
  {
    q: 'A comunidade é só para programadores experientes?',
    blocks: [
      {
        type: 'p',
        text: 'Não. A CommitPT tem membros em todos os níveis — desde estudantes e programadores em início de carreira até engenheiros com anos de experiência em empresas internacionais.',
      },
      {
        type: 'p',
        text: 'Isso é precisamente o que torna a comunidade útil. Quando tens dúvidas, há alguém que já passou pelo mesmo. Quando já sabes alguma coisa, partilhares esse conhecimento também te faz crescer.',
      },
      {
        type: 'p',
        text: 'O único requisito é teres vontade de aprender e de contribuir para o crescimento dos outros.',
      },
    ],
  },
  {
    q: 'O que encontro dentro da comunidade?',
    blocks: [
      {
        type: 'p',
        text: 'A CommitPT não é um curso. É um ambiente onde o crescimento acontece através da interação, da colaboração e de projetos reais.',
      },
      { type: 'p', text: 'Dentro da comunidade encontras, entre outras coisas:' },
      {
        type: 'list',
        items: [
          'Workshops práticos sobre temas técnicos e de carreira',
          'Calls semanais ao vivo com outros membros',
          'Revisões de código e feedback honesto',
          'Discussões técnicas sobre arquitetura, ferramentas e boas práticas',
          'Projetos internos onde podes colaborar com outros membros',
          'Recursos e materiais curados por profissionais da área',
          'Contacto direto com engenheiros experientes',
          'Uma comunidade ativa onde podes fazer perguntas sem julgamentos',
        ],
      },
    ],
  },
  {
    q: 'Quanto tempo preciso de dedicar por semana?',
    blocks: [
      {
        type: 'p',
        text: 'Não há um mínimo obrigatório. Cada pessoa participa ao seu próprio ritmo.',
      },
      {
        type: 'p',
        text: 'Há membros que entram todos os dias, outros que aparecem algumas vezes por semana. O que retiras da comunidade está diretamente relacionado com o que investes — mas essa decisão é sempre tua.',
      },
      {
        type: 'p',
        text: 'O importante é que quando precisares de feedback, de uma perspetiva diferente ou apenas de ver o que outros estão a construir, a comunidade está lá.',
      },
    ],
  },
  {
    q: 'Como funcionam as calls e workshops?',
    blocks: [
      {
        type: 'p',
        text: 'São sessões ao vivo, com foco em temas práticos. Não há apresentações genéricas — o objetivo é sempre aprender algo que possas aplicar.',
      },
      { type: 'p', text: 'Os temas variam consoante o que a comunidade precisa naquele momento:' },
      {
        type: 'list',
        items: [
          'Discussões técnicas e de arquitetura',
          'Revisões de código em projetos reais',
          'Temas de carreira — entrevistas, negociação, progressão',
          'Sessões de Q&A com engenheiros experientes',
          'Walkthroughs de projetos dos próprios membros',
        ],
      },
      {
        type: 'p',
        text: 'A participação é sempre opcional. As sessões ficam gravadas para quem não conseguir estar presente.',
      },
    ],
  },
  {
    q: 'Como sei se esta comunidade é para mim?',
    blocks: [
      {
        type: 'p',
        text: 'A CommitPT não é para toda a gente — e isso é intencional. É para pessoas que gostam de aprender, de construir coisas, de fazer perguntas e de partilhar o que sabem.',
      },
      {
        type: 'p',
        text: 'Se tens curiosidade genuína, se queres crescer como engenheiro a longo prazo, e se estás disposto a contribuir para o crescimento dos outros, vais sentir-te em casa.',
      },
      {
        type: 'p',
        text: 'Se procuras motivação rápida ou conteúdo para consumir passivamente, provavelmente não é o sítio certo.',
      },
    ],
  },
  {
    q: 'Qual é a diferença entre a comunidade gratuita e o Commit+?',
    blocks: [
      {
        type: 'p',
        text: 'A comunidade gratuita no Discord **vai continuar a existir sempre**. Podes entrar, fazer perguntas, conhecer pessoas e participar nas discussões sem pagar nada.',
      },
      { type: 'p', text: 'O Commit+ adiciona uma camada extra para quem quer ir mais fundo:' },
      {
        type: 'list',
        items: [
          'Workshops práticos e calls ao vivo exclusivas',
          'Acesso a recursos e materiais premium',
          'Participação em projetos internos da comunidade',
          'Interação mais próxima com a equipa e membros seniores',
          'Mais oportunidades de aprender com outros membros',
          'Acesso antecipado à plataforma que estamos a construir',
        ],
      },
    ],
  },
  {
    q: 'Porque é que o Commit+ é pago?',
    blocks: [
      {
        type: 'p',
        text: 'O objetivo não é monetizar o acesso à comunidade. O objetivo é **tornar o projeto sustentável** para que possa continuar a crescer.',
      },
      {
        type: 'p',
        text: 'Organizar workshops com qualidade, manter recursos atualizados, desenvolver a plataforma e investir em iniciativas para a comunidade tem custos reais. O Commit+ é o que torna isso possível.',
      },
      {
        type: 'p',
        text: 'Nenhum membro paga para ter acesso a uma comunidade — paga para ajudar a construir algo que beneficia todos, incluindo ele próprio.',
      },
    ],
  },
  {
    q: 'Posso cancelar quando quiser?',
    blocks: [
      { type: 'p', text: 'Sim. Sem contratos, sem compromissos a longo prazo.' },
      {
        type: 'p',
        text: 'O Commit+ funciona como uma **subscrição mensal simples**. Podes cancelar a qualquer momento, diretamente na plataforma, sem precisares de falar com ninguém.',
      },
    ],
  },
  {
    q: 'E se não gostar?',
    blocks: [
      {
        type: 'p',
        text: 'Podes experimentar e sair quando quiseres. Não há pressão nem complicações.',
      },
      {
        type: 'p',
        text: 'Se entras, participas durante um mês e decides que não é para ti, cancelas e pronto. Não te pedimos justificações nem tentamos convencer-te a ficar.',
      },
      {
        type: 'p',
        text: 'O que esperamos é que proves a ti próprio que vale a pena — e que fiques porque sentes valor, não porque te esqueceste de cancelar.',
      },
    ],
  },
]

function renderInline(text: string): React.ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

function renderBlocks(blocks: Block[]) {
  return blocks.map((block, i) =>
    block.type === 'list' ? (
      <ul key={i} className="list-none space-y-1">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="font-mono text-primary shrink-0">+</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p key={i}>{renderInline(block.text)}</p>
    )
  )
}

function blocksToPlainText(blocks: Block[]): string {
  return blocks
    .map((block) =>
      block.type === 'list'
        ? block.items.map((item) => `- ${item.replace(/\*\*/g, '')}`).join('\n')
        : block.text.replace(/\*\*/g, '')
    )
    .join('\n\n')
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlainText(faq.blocks),
      },
    })),
  }

  const renderFaqRow = (faq: FaqItem, i: number, isFirst: boolean, isLast: boolean) => {
    const isOpen = open === i
    const buttonId = `${id}-faq-btn-${i}`
    const panelId = `${id}-faq-panel-${i}`
    const slug = slugify(faq.q)

    return (
      <div
        key={faq.q}
        id={`faq-${slug}`}
        className={`scroll-mt-24 ${!isFirst ? 'border-t border-border' : ''}`}
      >
        <Button
          id={buttonId}
          variant="ghost"
          className={`group w-full h-auto justify-between gap-4 px-6 pt-7 pb-5 text-left transition-colors items-start rounded-none hover:bg-surface/60 ${
            isFirst ? 'rounded-t-lg' : ''
          } ${isLast && !isOpen ? 'rounded-b-lg' : ''}`}
          onClick={() => setOpen(isOpen ? null : i)}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="flex items-baseline gap-3 pr-4">
            <span className="font-mono text-xs text-muted-foreground shrink-0" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="whitespace-normal text-wrap group-hover:text-foreground transition-colors">
              {faq.q}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`ml-auto mt-0.5 shrink-0 transition-transform duration-200 group-hover:text-foreground motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-5">
              <div className="mb-4 h-px w-10 bg-border" aria-hidden="true" />
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {renderBlocks(faq.blocks)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="faq" className="border-t border-border">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            07 // Perguntas Frequentes
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Tens dúvidas. Temos respostas.
          </Typography>
          <Typography variant="p" color="muted" className="mt-5">
            Se ainda tens alguma questão antes de entrares, é provável que esteja aqui.
          </Typography>
        </div>
        <div className="rounded-lg border border-border bg-elevated shadow-xl shadow-black/40">
          {faqs.map((faq, i) => renderFaqRow(faq, i, i === 0, i === faqs.length - 1))}
        </div>
        <div className="mt-12 rounded-lg border border-border bg-surface p-8 text-center lg:p-12">
          <Typography variant="h3" className="sm:text-3xl">
            Não encontraste a tua resposta?
          </Typography>
          <Typography variant="p" color="muted" className="mx-auto mt-3 max-w-xl">
            Entra no Discord e pergunta diretamente à comunidade — respondemos rápido.
          </Typography>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              style={{ color: 'oklch(0.8 0.1 240)' }}
            >
              <MessageCircle size={16} />
              Perguntar no Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
