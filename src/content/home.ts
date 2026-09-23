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

export interface ComparisonColumn {
  name: string
  highlight?: boolean
}

export interface ComparisonRow {
  criterion: string
  /** Uma célula por coluna, pela mesma ordem de `comparison.columns`. */
  cells: Array<{ title: string; desc: string }>
}

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export interface FaqItem {
  question: string
  answer: string
}

// ── Header ────────────────────────────────────────────────────────────────────

export const nav: NavItem[] = [
  { label: 'Para quem', id: 'para-quem' },
  { label: 'O que ganhas', id: 'beneficios' },
  { label: 'Comparar', id: 'comparar' },
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

// ── Compara as alternativas ───────────────────────────────────────────────────

const LOREM_CELL = { title: 'Lorem ipsum', desc: 'Dolor sit amet, consectetur adipiscing elit.' } // TODO(copy)

export const comparison = {
  label: 'A escolha certa',
  title: 'Compara as alternativas',
  columns: [
    { name: 'Ensino tradicional' },
    { name: 'Bootcamps' },
    { name: 'Aprender sozinho' },
    { name: 'CommitPT', highlight: true },
  ] satisfies ComparisonColumn[],
  rows: ['Custo', 'Aplicação prática', 'Empregabilidade', 'Ritmo'].map(
    (criterion): ComparisonRow => ({
      criterion,
      cells: [LOREM_CELL, LOREM_CELL, LOREM_CELL, LOREM_CELL],
    })
  ),
  nudge: 'Queres o ritmo completo? Commit+ desde 9,99 €/mês.',
  nudgeCta: 'Ver o Commit+',
}

// ── Testemunhos ───────────────────────────────────────────────────────────────

export const testimonials = {
  label: 'Resultados',
  title: 'O que dizem os membros',
  // TODO(copy): só testemunhos reais, com autorização
  items: [1, 2, 3].map((n): Testimonial => ({
    name: `Membro ${n}`,
    role: 'Lorem ipsum',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  })),
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
  // TODO(copy): respostas finais — ver FAQ do commitpt.com atual
  items: [
    'Preciso de experiência para entrar?',
    'Qual a diferença entre o Gratuito e o Commit+?',
    'Como funcionam as sessões?',
    'Posso cancelar quando quiser?',
    'O Commit+ garante emprego?',
  ].map((question): FaqItem => ({
    question,
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  })),
}
