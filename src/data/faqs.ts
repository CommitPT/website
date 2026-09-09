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
    q: 'Preciso de ser um programador experiente para entrar?',
    blocks: [
      {
        type: 'p',
        text: 'Não. A CommitPT tem membros em todos os níveis — de estudantes e programadores em início de carreira a engenheiros com anos de experiência em empresas internacionais.',
      },
      {
        type: 'p',
        text: 'É precisamente essa mistura que torna a comunidade útil: quando tens uma dúvida, há sempre alguém que já passou por ela; quando já sabes alguma coisa, partilhá-la também te ajuda a crescer.',
      },
      {
        type: 'p',
        text: 'O único requisito real é vontade de aprender e de contribuir para o crescimento dos outros.',
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
          'Commit Talks — conversas e Q&A com profissionais da indústria',
          'Commit Sessions — sessões técnicas de Engenharia de Software',
          'Commit Career — iniciativas de carreira, recrutamento e desenvolvimento profissional',
          'Oportunidades de participação em projetos da comunidade',
          'Feedback técnico sobre código e decisões de arquitetura',
        ],
      },
      {
        type: 'p',
        text: 'Como funciona exatamente a participação nos projetos explicamos na pergunta seguinte.',
      },
    ],
  },
  {
    id: 'participacao-projetos',
    q: 'Como funciona a participação nos projetos?',
    blocks: [
      {
        type: 'p',
        text: 'O Commit+ dá acesso às oportunidades de participação nos projetos da comunidade — não a todos os projetos, e não de forma automática.',
      },
      {
        type: 'p',
        text: 'Alguns projetos têm adesão direta. Outros funcionam exclusivamente por convite da Core Team, consoante a natureza do projeto, a dimensão da equipa, as necessidades existentes ou os requisitos técnicos em cada momento.',
      },
      {
        type: 'p',
        text: 'Ter uma subscrição Commit+ ativa pode ser um requisito para participar nalguns projetos, mas não garante convite, participação ou acesso a todos eles. As condições específicas são sempre apresentadas em cada projeto.',
      },
    ],
  },
  {
    id: 'depois-de-aderir',
    q: 'O que acontece depois de aderir ao Commit+?',
    blocks: [
      {
        type: 'p',
        text: 'A subscrição é processada pelo Whop. Assim que o pagamento é confirmado, o teu acesso Commit+ fica ativo e passas a ter lugar nas próximas Commit Talks, Commit Sessions e iniciativas de Commit Career.',
      },
      {
        type: 'p',
        text: 'No Discord, o bot da comunidade trata da atribuição do teu novo estatuto e da criação dos canais associados ao Commit+.',
      },
      {
        type: 'p',
        text: 'A partir daí, a participação é contigo — nas sessões, nas discussões técnicas ou nas oportunidades de projetos que forem surgindo.',
      },
    ],
  },
  {
    id: 'porque-pago',
    q: 'Porque é que o Commit+ é pago?',
    blocks: [
      {
        type: 'p',
        text: 'Organizar Commit Talks, Commit Sessions e iniciativas de Commit Career com qualidade, manter os recursos atualizados e continuar a desenvolver a comunidade tem custos reais.',
      },
      {
        type: 'p',
        text: 'O Commit+ é o que torna isso possível — e em troca, tens acesso direto a essas iniciativas, a profissionais da indústria e a oportunidades de participação em projetos.',
      },
      {
        type: 'p',
        text: 'Não pagas para poderes fazer parte da comunidade. Pagas para ires mais além dentro dela.',
      },
    ],
  },
  {
    id: 'pago-discord',
    q: 'Estou a pagar para usar o Discord?',
    blocks: [
      {
        type: 'p',
        text: 'Não. O Commit+ não é uma subscrição para aceder ao Discord — a comunidade continua gratuita, com ou sem Commit+.',
      },
      { type: 'p', text: 'Os 19,99€/mês dão acesso a:' },
      {
        type: 'list',
        items: [
          'Commit Talks — conversas e Q&A com profissionais da indústria',
          'Commit Sessions — sessões técnicas de Engenharia de Software',
          'Commit Career — iniciativas de carreira, recrutamento e desenvolvimento profissional',
          'Oportunidades de participação em projetos da comunidade',
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
        text: 'Não há garantia de emprego, de entrevistas ou de progressão profissional — nenhuma comunidade pode prometer isso honestamente, e nós não o fazemos.',
      },
      {
        type: 'p',
        text: 'O que o Commit+ te dá é contacto direto com profissionais da indústria através das Commit Talks e Commit Career, contexto real sobre o mercado e espaço para participar e mostrar o que sabes fazer.',
      },
      {
        type: 'p',
        text: 'O que fazes com isso é contigo — os resultados dependem sempre da tua participação.',
      },
    ],
  },
  {
    id: 'mensal-vs-anual',
    q: 'Qual é a diferença entre o plano mensal e anual?',
    blocks: [
      {
        type: 'p',
        text: 'Só o preço. As duas opções dão acesso exatamente às mesmas iniciativas — Commit Talks, Commit Sessions, Commit Career, oportunidades de participação em projetos e feedback técnico.',
      },
      {
        type: 'list',
        items: ['Mensal — 19,99€/mês', 'Anual — equivalente a 9,99€/mês, cobrado uma vez por ano'],
      },
      {
        type: 'p',
        text: 'O plano anual é a opção mais económica se já sabes que queres continuar por mais tempo.',
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
      {
        type: 'p',
        text: 'Sim. O Commit+ não tem contratos nem compromissos a longo prazo, seja no plano mensal ou anual.',
      },
      {
        type: 'p',
        text: 'O cancelamento é feito diretamente na plataforma de subscrição (Whop), a partir da tua conta.',
      },
    ],
  },
  {
    id: 'e-se-nao-gostar',
    q: 'E se não gostar?',
    blocks: [
      { type: 'p', text: 'Cancelas quando quiseres, sem pressão.' },
      {
        type: 'p',
        text: 'Experimenta um mês, participa nas sessões e nas discussões, e decide se faz sentido continuar. Se não fizer, sais sem complicações.',
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
