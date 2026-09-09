import dynamic from 'next/dynamic'
import { selectFaqs } from '@/src/data/faqs'
import Header from '@/src/components/Header'
import Hero from '@/src/components/Hero'
import WhatHappens from '@/src/components/WhatHappens'
import Community from '@/src/components/Community'
import Projects from '@/src/components/Projects'
import Events from '@/src/components/Events'
import Footer from '@/src/components/Footer'
import CommitPlusSection from '@/src/components/CommitPlusSection'
import { getContributors } from '@/src/lib/contributors'

const SocialProof = dynamic(() => import('@/src/components/SocialProof'))
const ContributorsTeaser = dynamic(() => import('@/src/components/ContributorsTeaser'))
const FAQ = dynamic(() => import('@/src/components/FAQ'))

const FAQ_IDS = [
  'niveis',
  'calls-workshops',
  'diferenca-gratuito',
  'participacao-projetos',
  'depois-de-aderir',
  'porque-pago',
  'pago-discord',
  'garante-emprego',
  'mensal-vs-anual',
  'cancelar',
  'e-se-nao-gostar',
]

export default async function Home() {
  // Fonte única para a contagem de contribuidores — Hero, Comunidade e Pessoas
  // mostram sempre o mesmo número.
  const contributors = await getContributors()

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <Hero contributorsCount={contributors.length} />
        <WhatHappens />
        <Community contributorsCount={contributors.length} />
        <Projects />
        <Events />
        <ContributorsTeaser contributors={contributors} />
        <SocialProof />
        <CommitPlusSection />
        <FAQ
          eyebrow="09 // Perguntas Frequentes"
          heading="Tens dúvidas. Temos respostas."
          description="As perguntas que costumam aparecer antes de entrares."
          items={selectFaqs(FAQ_IDS)}
        />
      </main>
      <Footer />
    </div>
  )
}
