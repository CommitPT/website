// ── Homepage copy ─────────────────────────────────────────────────────────────
//
// Todo o texto da homepage vive aqui, não no JSX. Linhas com `TODO(copy)` são
// provisórias (lorem ou rascunho) e têm de ser revistas antes de lançar.
// Números e preços são reais — atualizar aqui quando mudarem.

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  /** id da secção na homepage (sem #). */
  id: string
}

export interface Stat {
  value: string
  label: string
}

export interface Profile {
  title: string
  desc: string
}

export type Tier = 'free' | 'plus'

export interface Benefit {
  tier: Tier
  title: string
  desc: string
  /** Prova concreta, em mono (ex.: "4+ sessões por mês"). */
  proof: string
}

export interface PlanRow {
  /** O que se compara (ex.: "Commit Sessions"). */
  criterion: string
  /** Uma linha a explicar o que é. */
  detail: string
  /** `null` = não está incluído no plano gratuito. */
  free: string | null
  plus: string
}

export interface FaqItem {
  question: string
  answer: string
}

// ── Header ────────────────────────────────────────────────────────────────────

export const nav: NavItem[] = [
  { label: 'Para quem', id: 'para-quem' },
  { label: 'O que ganhas', id: 'beneficios' },
  { label: 'Como funciona', id: 'como-funciona' },
  { label: 'Commit+', id: 'precos' },
  { label: 'FAQ', id: 'faq' },
]

export const announcement = {
  tag: 'AO VIVO',
  // TODO(copy): confirmar a hora dos encontros, e trocar por um evento concreto
  // quando houver data marcada (ex.: "Commit Talk com <convidado>: 12 de outubro").
  text: 'Encontros abertos às terças e quintas, no Discord',
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Comunidade portuguesa · Engenharia de Software',
  title: 'Programar sozinho tem limite.',
  subtitle:
    'Uma comunidade portuguesa de engenharia de software: partilhar código, rever o trabalho uns dos outros e construir projetos em conjunto. Entrar é grátis.',
  primaryCta: 'Entrar grátis no Discord',
  secondaryCta: 'Ver o Commit+',
  /** ID do vídeo no YouTube. `null` mostra "Vídeo em breve". */
  videoId: null as string | null,
  videoTitle: 'Apresentação da CommitPT',
  proof: '550+ developers já estão lá dentro',
}

export const stats: Stat[] = [
  { value: '550+', label: 'Membros' },
  { value: '90 000+', label: 'Mensagens' },
  { value: '4+', label: 'Sessões/mês' },
  { value: '14+', label: 'Contributors' },
]

// ── Para quem é ───────────────────────────────────────────────────────────────

export const forWho = {
  label: 'Para quem é',
  title: 'Para quem é a CommitPT?',
  profiles: [
    { title: 'Estudantes', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, // TODO(copy)
    {
      title: 'À procura do 1.º emprego',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // TODO(copy)
    },
    {
      title: 'Devs a subir de nível',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // TODO(copy)
    },
    {
      title: 'Em mudança de carreira',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // TODO(copy)
    },
  ] satisfies Profile[],
}

// ── O que ganhas ──────────────────────────────────────────────────────────────

export const benefits = {
  label: 'O que ganhas',
  title: 'O que ganhas ao entrar na comunidade?',
  items: [
    {
      tier: 'free',
      title: 'Rede de 550+ devs em Portugal',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.', // TODO(copy)
      proof: '90 000+ mensagens trocadas',
    },
    {
      tier: 'plus',
      title: 'Talks com recrutadores',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.', // TODO(copy)
      proof: 'Commit Talk',
    },
    {
      tier: 'plus',
      title: 'Sessions técnicas',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.', // TODO(copy)
      proof: '4+ sessões por mês',
    },
    {
      tier: 'plus',
      title: 'Projetos reais com code review',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.', // TODO(copy)
      proof: 'Git · PRs · Code review',
    },
  ] satisfies Benefit[],
}

// ── Quem está por trás ────────────────────────────────────────────────────────

export const founder = {
  label: 'Quem está por trás',
  title: 'Lorem ipsum dolor sit amet', // TODO(copy)
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.', // TODO(copy)
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', // TODO(copy)
  ],
}

// ── Como funciona ─────────────────────────────────────────────────────────────
//
// Esta secção descreve, não compara. Medir a CommitPT contra um CTESP, uma
// licenciatura ou um bootcamp seria comparar coisas que dão resultados
// diferentes — e nada aqui pode sugerir emprego garantido.

export const howItWorks = {
  label: 'Como funciona',
  title: 'O que está incluído',
  columns: ['Gratuito', 'Commit+'],
  rows: [
    {
      criterion: 'Encontros',
      detail: 'Tópicos gerais, dúvidas e o que cada um anda a fazer.',
      free: 'Terças e quintas',
      plus: 'Terças e quintas',
    },
    {
      criterion: 'Discussões técnicas',
      detail: 'Perguntas, código e decisões debatidas nos canais.',
      free: 'Sim',
      plus: 'Sim',
    },
    {
      criterion: 'Commit Sessions',
      detail: 'Workshop técnico dado por um membro, sobre o que domina.',
      free: null,
      plus: 'Regular',
    },
    {
      criterion: 'Commit Talks',
      detail: 'Conversa com recrutadores e profissionais da indústria.',
      free: null,
      plus: 'Quando há convidado',
    },
    {
      criterion: 'Commit Career',
      detail: 'CV, processos de entrevista, salários e progressão.',
      free: null,
      plus: 'Contínuo',
    },
    {
      criterion: 'Projetos da comunidade',
      detail: 'Código real, com PRs e code review de quem já trabalha na área.',
      free: null,
      plus: 'Contínuo',
    },
  ] satisfies PlanRow[],
  disclaimer:
    'Comunidade de prática entre pares: complementa formação e experiência, não as substitui. Não há programa curricular, certificação nem garantia de colocação profissional.',
  nudge: 'Queres as Sessions, as Talks e os projetos? Commit+ desde 9,99 €/mês.',
  nudgeCta: 'Ver o Commit+',
}

// ── Testemunhos ───────────────────────────────────────────────────────────────

// As avaliações vêm da Whop (`getWhopReviews`) e de `src/reviews.json`; nada aqui
// é escrito por nós.
export const testimonials = {
  label: 'Resultados',
  title: 'O que dizem os membros',
  note: 'Avaliações recolhidas na Whop e no Discord, publicadas como foram escritas.',
}

// ── Preços ────────────────────────────────────────────────────────────────────

export const pricing = {
  label: 'Commit+',
  title: 'Começa grátis. Sobe quando quiseres.',
  free: {
    name: 'Gratuito',
    price: '0 €',
    note: 'Sem cartão de crédito',
    features: ['Discord da comunidade', 'Discussões técnicas', 'Eventos abertos'],
    cta: 'Entrar grátis',
  },
  plus: {
    name: 'Commit+',
    price: '9,99 €',
    period: '/mês',
    note: '119,88 € por ano · poupas 50%',
    includes: 'Tudo do Gratuito',
    features: [
      'Commit Talks com recrutadores',
      'Commit Sessions (workshops)',
      'Commit Career (CV, entrevistas, salários)',
      'Projetos da comunidade com code review',
    ],
    cta: 'Aderir por 119,88 €/ano',
    monthlyCta: 'ou 19,99 € por mês',
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export const faq = {
  label: 'FAQ',
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'Preciso de ter experiência para entrar?',
      answer:
        'Não. Há membros em todos os níveis, de quem está a aprender os primeiros conceitos a profissionais no ativo. Os canais e os encontros de terças e quintas são abertos a todos, e participas ao teu ritmo.',
    },
    {
      question: 'Qual é a diferença entre o Gratuito e o Commit+?',
      answer:
        'O Gratuito dá acesso à comunidade toda: Discord, discussões técnicas e os encontros abertos de terças e quintas. O Commit+ acrescenta as Commit Sessions (workshops técnicos), as Commit Talks (conversas com recrutadores e profissionais), o Commit Career (CV, entrevistas e progressão) e acesso a projetos da comunidade com code review.',
    },
    {
      question: 'Como funcionam os encontros e as Commit Sessions?',
      answer:
        'Os encontros de terças e quintas são conversas abertas sobre o que cada um anda a construir e dúvidas técnicas. As Commit Sessions são workshops técnicos dados por membros da comunidade sobre temas que dominam — já houve, por exemplo, sessões de cibersegurança. Acontecem ao vivo, no Discord.',
    },
    {
      question: 'Posso cancelar o Commit+ quando quiser?',
      answer:
        'Sim. A subscrição é processada pela Whop e podes cancelar a qualquer momento, sem contrato nem fidelização. O acesso mantém-se até ao fim do período já pago.',
    },
    {
      question: 'O Commit+ garante emprego?',
      answer:
        'Não, e nenhuma comunidade o pode garantir com seriedade. O Commit+ dá-te prática, code review de pares e contacto direto com quem recruta e trabalha na área. Não é um curso, não emite certificado e não substitui a tua formação académica ou profissional — soma-se a ela.',
    },
    {
      question: 'Tenho de pagar para entrar no Discord?',
      answer:
        'Não. O Discord é gratuito e aberto. O Commit+ é uma camada opcional por cima, não um requisito para participar na comunidade.',
    },
    {
      question: 'Quem dá as Commit Sessions e as Commit Talks?',
      answer:
        'As Commit Sessions são dadas por membros da própria comunidade, sobre temas que dominam no dia a dia. As Commit Talks juntam recrutadores e profissionais da indústria dispostos a responder a perguntas reais sobre o mercado.',
    },
    {
      question: 'Não encontrei resposta à minha pergunta. O que faço?',
      answer: 'Entra no Discord e pergunta diretamente nos canais da comunidade.',
    },
  ] satisfies FaqItem[],
}
