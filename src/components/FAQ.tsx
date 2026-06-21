'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'A comunidade é só para programadores experientes?',
    a: 'Não. A CommitPT foi criada a pensar em todos os níveis — desde quem está a começar até profissionais com anos de experiência. O importante é teres vontade de crescer e contribuir.',
  },
  {
    q: 'Que tipo de conteúdo encontro dentro da comunidade?',
    a: 'Sessões ao vivo, revisões de código, discussões de carreira, roadmaps, recursos técnicos e uma comunidade ativa no Discord onde podes fazer perguntas e colaborar com outros programadores.',
  },
  {
    q: 'Quanto tempo preciso de dedicar por semana?',
    a: 'O mínimo que retiras valor é com 1 a 2 horas por semana. Mas quanto mais participares, mais cresces. Não há compromisso obrigatório — apenas recomendamos participação regular para tirares o máximo partido.',
  },
  {
    q: 'O que é o Whop? É seguro?',
    a: 'O Whop é a plataforma que utilizamos para gerir membros pagos. É uma plataforma de memberships amplamente utilizada por criadores e comunidades. O pagamento é seguro e podes cancelar a qualquer momento.',
  },
  {
    q: 'Existe uma versão gratuita?',
    a: 'Sim. Podes entrar no nosso Discord gratuitamente e ter acesso a uma parte da comunidade. Para acesso completo a todas as sessões, recursos e canais exclusivos, podes tornar-te membro no Whop.',
  },
  {
    q: 'E se não gostar?',
    a: 'Podes cancelar a qualquer altura, sem complicações. Não há contratos nem períodos mínimos. Se não sentires valor, simplesmente deixas de ser membro.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="border-t border-border bg-ink-light">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">
            06 // Perguntas Frequentes
          </span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Tens dúvidas. Temos respostas.
          </h2>
          <p className="mt-4 text-muted">
            Se ainda tens alguma questão antes de entrares, é provável que esteja aqui.
          </p>
        </div>
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-border">
              <button
                className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-text-primary hover:text-git-add transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  className={`ml-4 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && <p className="pb-4 text-sm leading-relaxed text-muted">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
