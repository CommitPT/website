// ── Types ─────────────────────────────────────────────────────────────────────

export type Block = { type: 'p'; text: string } | { type: 'list'; items: string[] }

export interface FaqItem {
  /** Stable handle so pages can pick a subset by name. */
  id: string
  q: string
  blocks: Block[]
}

// ── Data ──────────────────────────────────────────────────────────────────────
//
// Single source for every FAQ on the site. Both the rendered accordion and the
// FAQPage JSON-LD derive from these entries, so the two can never drift apart.

export const faqs: FaqItem[] = [
  {
    id: 'niveis',
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
    id: 'o-que-encontro',
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
    id: 'tempo',
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
    id: 'calls-workshops',
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
    id: 'e-para-mim',
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
    id: 'diferenca-gratuito',
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
          'Revisões de código em projetos reais',
          'Participação em projetos internos da comunidade',
          'Eventos exclusivos sobre carreira, programação e construção de projetos',
        ],
      },
    ],
  },
  {
    id: 'porque-pago',
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
    id: 'passou-a-ser-paga',
    q: 'A CommitPT passou a ser paga?',
    blocks: [
      {
        type: 'p',
        text: 'Não. A comunidade no Discord continua — e vai continuar — completamente gratuita. Entrar, fazer perguntas, participar em discussões e fazer networking nunca teve nem vai ter custo.',
      },
      {
        type: 'p',
        text: 'O Commit+ não é uma versão "desbloqueada" da comunidade gratuita nem uma forma de cobrar por algo que antes era de graça. É uma camada adicional, opcional, para quem quer investir mais ativamente no seu desenvolvimento técnico e profissional.',
      },
    ],
  },
  {
    id: 'pago-discord',
    q: 'Estou a pagar para usar o Discord?',
    blocks: [
      {
        type: 'p',
        text: 'Não. O acesso ao Discord da comunidade é e continua gratuito, com ou sem Commit+.',
      },
      { type: 'p', text: 'Os 9,99€/mês não dão acesso a um "Discord privado". Dão acesso a:' },
      {
        type: 'list',
        items: [
          'Commit Talks — conversas e Q&A com pessoas da indústria',
          'Commit Sessions — sessões técnicas em áreas específicas de Engenharia de Software',
          'Commit Career — conteúdo e iniciativas de desenvolvimento profissional',
          'Participação em projetos internos da comunidade',
          'Feedback técnico sobre código, arquitetura e decisões de projeto',
        ],
      },
    ],
  },
  {
    id: 'garante-emprego',
    q: 'Vou conseguir emprego através do Commit+?',
    blocks: [
      {
        type: 'p',
        text: 'Não existe qualquer garantia de emprego, entrevistas ou progressão profissional. Nenhuma comunidade pode prometer isso honestamente, e nós não o fazemos.',
      },
      {
        type: 'p',
        text: 'O que o Commit+ oferece é contacto direto com profissionais da indústria, contexto real sobre o mercado e oportunidades de participar, contribuir e aprender. O que fazes com isso depende de ti.',
      },
    ],
  },
  {
    id: 'acompanhamento-individual',
    q: 'Tenho acompanhamento individual (mentoria 1:1)?',
    blocks: [
      {
        type: 'p',
        text: 'Não. O Commit+ é um modelo comunitário, não um serviço de mentoria individual permanente.',
      },
      {
        type: 'p',
        text: 'Isso significa feedback e discussão em grupo, sessões abertas a todos os membros, e contacto com várias pessoas em vez de um único mentor. Nem todo o código submetido tem garantia de revisão individual — mas há espaço regular para pedir e receber feedback.',
      },
    ],
  },
  {
    id: 'cancelar',
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
    id: 'e-se-nao-gostar',
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
        text: 'Experimenta durante um mês. Fica se fizer sentido para ti.',
      },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Pick FAQ entries by id, in the order given.
 *
 * Throws on an unknown id rather than silently dropping it — pages are
 * statically generated, so a typo fails the build instead of shipping a
 * section with a missing question.
 */
export function selectFaqs(ids: string[]): FaqItem[] {
  return ids.map((id) => {
    const faq = faqs.find((item) => item.id === id)
    if (!faq) throw new Error(`Unknown FAQ id: "${id}"`)
    return faq
  })
}

/** Flatten blocks to plain text for the FAQPage JSON-LD. */
export function blocksToPlainText(blocks: Block[]): string {
  return blocks
    .map((block) =>
      block.type === 'list'
        ? block.items.map((item) => `- ${item.replace(/\*\*/g, '')}`).join('\n')
        : block.text.replace(/\*\*/g, '')
    )
    .join('\n\n')
}
