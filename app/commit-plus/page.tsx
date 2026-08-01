import { ArrowRight, Check, MessageCircle, Sparkles, ShieldCheck, Users, Zap } from 'lucide-react'
import { buttonVariants, FeatureCard, Typography } from '@commitpt/design-system'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import FaqAccordion from '@/src/components/FaqAccordion'

const benefits = [
  {
    icon: Sparkles,
    title: 'Workshops que resolvem o problema que tens agora',
    description:
      'Nada de teoria genérica. Sessões ao vivo focadas no que estás a construir esta semana, com gravações para reveres quando precisares.',
  },
  {
    icon: Users,
    title: 'Um grupo pequeno onde não desapareces',
    description:
      'Feedback direto de quem já passou pelo que estás a passar — sem te perderes no ruído de um servidor com milhares de pessoas.',
  },
  {
    icon: ShieldCheck,
    title: 'Templates que poupam as tuas horas',
    description:
      'Roadmaps e materiais prontos a usar. Não perdes tempo a decidir por onde começar — começas.',
  },
  {
    icon: Zap,
    title: 'Sais daqui a fazer ship, não a planear fazer ship',
    description:
      'Estrutura + accountability + feedback semanal é a diferença entre "um dia" e "esta semana".',
  },
]

const comparison = [
  ['Acesso ao Discord', 'Sim', 'Sim'],
  ['Workshops ao vivo', 'Sem acesso', 'Todas as semanas'],
  ['Revisão do teu projeto', 'Não', 'Todos os meses'],
  ['Templates e materiais premium', 'Não', 'Acesso total'],
  ['Feedback direto de quem já lá está', 'Não', 'Sim'],
  ['Ritmo de progresso', 'Ao acaso', 'Estruturado'],
]

const heroStats = [
  { label: 'ritmo de ship', value: '1x/semana' },
  { label: 'pontos de accountability', value: '4+' },
  { label: 'ciclos de feedback/mês', value: '12+' },
]

const freeTierBadges = ['Discord', 'Eventos públicos']
const commitPlusBadges = ['Workshops semanais', 'Recursos premium', 'Feedback direto']

const testimonial = {
  quote:
    'Entrei só para acompanhar as conversas. Um dia fiz uma pergunta, a forma como fui ajudado mostrou-me que estava no sítio certo — decidi aderir ao Commit+ e não me arrependo.',
  author: 'Duarte Marques',
  handle: '@9duarte',
}

const socialProofStats = [
  { label: 'membros na Commit+', value: '27' },
  { label: 'avaliação média', value: '5.0/5' },
]

const plans = [
  {
    name: 'Free',
    description: 'Para espreitar. Não é onde as coisas acontecem.',
    price: '0€',
    features: [
      'Acesso ao Discord',
      'Participação nas discussões',
      'Eventos públicos e community calls',
    ],
    highlight: false,
  },
  {
    name: 'Commit+',
    description: 'Para quem decidiu parar de adiar.',
    price: '9,99€',
    features: [
      'Workshops e calls exclusivas, todas as semanas',
      'Todos os templates e materiais premium',
      'Feedback direto no teu projeto, todos os meses',
      'Cancela quando quiseres, sem contrato',
    ],
    highlight: true,
  },
]

const faqs = [
  {
    question: 'O Discord grátis já não chega?',
    answer:
      'Chega para veres o que os outros estão a fazer. Não chega para teres feedback direto no teu projeto nem workshops ao vivo — isso é só Commit+. Se só queres observar, o Free serve. Se queres avançar, não serve.',
  },
  {
    question: 'E se eu entrar e não for para mim?',
    answer:
      'Cancelas a qualquer momento, sem burocracia, sem perguntas. Não há contrato nem fidelização — se não estiver a fazer diferença, sais no mesmo mês.',
  },
  {
    question: 'Quanto tempo até eu ver resultado?',
    answer:
      'Depende do que trouxeres, mas a estrutura é semanal: entras esta semana, tens workshop e feedback esta semana. Não é uma promessa de resultado — é acesso a um ritmo que a maioria não consegue sozinha.',
  },
]

export default function CommitPlusPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header />
      <main>
        <section className="border-b border-border bg-transparent">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:py-28">
            <div className="relative max-w-2xl">
              <Typography variant="overline" color="secondary" as="span" className="font-mono">
                01 // Commit+
              </Typography>
              <Typography variant="h1" className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
                Já sabes o que tens de fazer.
                <span className="mt-2 block bg-linear-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                  O que te falta é quem te obrigue a fazer.
                </span>
              </Typography>
              <Typography variant="p" color="muted" className="mt-5 max-w-xl text-lg">
                O Commit+ é a diferença entre "estou a aprender a programar" e ter um projeto
                lançado com pessoas a acompanhar-te de perto, toda a semana.
              </Typography>

              <div className="mt-6 flex flex-wrap gap-2">
                {freeTierBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
                {commitPlusBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-surface px-4 py-4"
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-text-primary">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://whop.com/commitpt-709e/commit-plus"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: 'lg' })}
                >
                  Quero entrar no Commit+
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://whop.com/joined/commitpt-709e/products/acesso-commitpt/"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                  style={{ color: 'oklch(0.8 0.1 240)' }}
                >
                  <MessageCircle size={16} />
                  Ver o Discord primeiro
                </a>
              </div>
              <Typography variant="p" color="muted" className="mt-3 text-xs">
                Cancela quando quiseres. Sem contrato, sem letras pequenas.
              </Typography>
            </div>

            <div className="relative w-full max-w-xl rounded-2xl border border-primary/40 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(10,15,26,0.96))] p-8 shadow-2xl shadow-black/30 ring-1 ring-primary/10">
              <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
              <div className="flex items-center gap-2 text-sm font-mono text-primary">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                O que muda a partir do dia 1
              </div>
              <div className="mt-6 space-y-4">
                {[
                  'Sabes exatamente o que fazer esta semana, não "algum dia"',
                  'Alguém vê o teu progresso e te chama a atenção se parares',
                  'Sais de cada workshop com algo funcional, não só notas',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-border bg-background/70 p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div className="flex gap-6">
                {socialProofStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <Typography variant="p" className="text-sm" style={{ color: '#ffffff' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </Typography>
                <Typography variant="p" className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {testimonial.author} · {testimonial.handle}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="mb-12 max-w-2xl">
              <Typography variant="overline" color="secondary" as="span" className="font-mono">
                02 // O que tens de mais
              </Typography>
              <Typography variant="h2" className="mt-3 sm:text-4xl">
                No Free aprendes sozinho. No Commit+ não ficas sozinho.
              </Typography>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <FeatureCard
                  key={benefit.title}
                  icon={<benefit.icon className="icon" aria-hidden="true" />}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="mb-12 max-w-2xl">
              <Typography variant="overline" color="secondary" as="span" className="font-mono">
                03 // Comparação direta
              </Typography>
              <Typography variant="h2" className="mt-3 sm:text-4xl">
                O que estás a perder por ficares no Free.
              </Typography>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/20">
              <div className="grid grid-cols-[1.3fr_repeat(2,minmax(0,1fr))] border-b border-border bg-background/70 text-sm font-mono text-muted-foreground">
                <div className="px-6 py-4">O que recebes</div>
                <div className="px-6 py-4 text-muted-foreground">Free</div>
                <div className="px-6 py-4 text-primary">Commit+</div>
              </div>
              {comparison.map(([feature, free, premium]) => (
                <div
                  key={feature}
                  className="grid grid-cols-[1.3fr_repeat(2,minmax(0,1fr))] border-b border-border last:border-b-0"
                >
                  <div className="px-6 py-4 text-sm font-medium text-foreground">{feature}</div>
                  <div className="px-6 py-4 text-sm text-muted-foreground">{free}</div>
                  <div className="px-6 py-4 text-sm font-medium text-primary">{premium}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="https://whop.com/commitpt-709e/commit-plus"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: 'lg' })}
              >
                Passar para o Commit+
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="mb-12 max-w-2xl">
              <Typography variant="overline" color="secondary" as="span" className="font-mono">
                04 // Planos
              </Typography>
              <Typography variant="h2" className="mt-3 sm:text-4xl">
                Escolhe. Mas escolhe hoje — não daqui a "quando tiver mais tempo".
              </Typography>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-8 transition-colors hover:border-primary ${plan.highlight ? 'border-primary bg-primary/10 shadow-xl shadow-black/20' : 'border-border bg-surface hover:bg-surface/90'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Typography variant="h3">{plan.name}</Typography>
                      <Typography variant="p" color="muted" className="mt-3">
                        {plan.description}
                      </Typography>
                    </div>
                    {plan.highlight ? (
                      <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-mono text-primary">
                        Escolha da maioria
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                    {plan.name === 'Commit+' ? (
                      <span className="pb-1 text-sm text-muted-foreground">/mês · cancela quando quiseres</span>
                    ) : null}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={
                      plan.name === 'Commit+'
                        ? 'https://whop.com/commitpt-709e/commit-plus'
                        : 'https://whop.com/joined/commitpt-709e/products/acesso-commitpt/'
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors ${plan.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border text-foreground hover:border-primary hover:text-primary'}`}
                  >
                    {plan.name === 'Commit+' ? 'Quero o Commit+ agora' : 'Ficar no Free por agora'}
                    <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="mb-12 max-w-2xl">
              <Typography variant="overline" color="secondary" as="span" className="font-mono">
                05 // FAQ
              </Typography>
              <Typography variant="h2" className="mt-3 sm:text-4xl">
                As dúvidas que estão a impedir-te de clicar.
              </Typography>
            </div>
            <FaqAccordion
              items={faqs.map((faq) => ({ question: faq.question, answer: <p>{faq.answer}</p> }))}
            />
          </div>
        </section>

        <section className="bg-transparent">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <div className="rounded-2xl border border-border bg-surface p-10 text-center shadow-xl shadow-black/30">
              <Typography variant="h3" className="sm:text-3xl">
                Daqui a um mês vais estar exatamente onde estás agora — ou não.
              </Typography>
              <Typography variant="p" color="muted" className="mx-auto mt-3 max-w-2xl">
                A diferença é se decides hoje entrar num ritmo com pessoas a puxar por ti, ou se
                voltas a esta página daqui a três meses no mesmo sítio.
              </Typography>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://whop.com/commitpt-709e/commit-plus"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: 'lg' })}
                >
                  Quero entrar no Commit+
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://whop.com/joined/commitpt-709e/products/acesso-commitpt/"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                  style={{ color: 'oklch(0.8 0.1 240)' }}
                >
                  <MessageCircle size={16} />
                  Entrar no Discord primeiro
                </a>
              </div>
              <Typography variant="p" color="muted" className="mt-3 text-xs">
                Cancela quando quiseres. Sem contrato, sem letras pequenas.
              </Typography>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}