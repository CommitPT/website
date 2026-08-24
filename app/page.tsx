import dynamic from 'next/dynamic'
import { faqs } from '@/src/data/faqs'
import Header from '@/src/components/Header'
import Hero from '@/src/components/Hero'
import ForWho from '@/src/components/ForWho'
import About from '@/src/components/About'
import Inside from '@/src/components/Inside'
import Features from '@/src/components/Features'
import Footer from '@/src/components/Footer'
import { getContributors } from '@/src/lib/contributors'

const Team = dynamic(() => import('@/src/components/Team'))
const SocialProof = dynamic(() => import('@/src/components/SocialProof'))
const ContributorsTeaser = dynamic(() => import('@/src/components/ContributorsTeaser'))
const FAQ = dynamic(() => import('@/src/components/FAQ'))

export default async function Home() {
  // Fonte única para a contagem de contribuidores — o Hero e a página
  // /contributors passam a mostrar sempre o mesmo número.
  const contributors = await getContributors()

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <Hero contributorsCount={contributors.length} />
        <ForWho />
        <Inside />
        <About />
        <Features />
        <Team />
        <SocialProof />
        <ContributorsTeaser />
        <FAQ
          eyebrow="07 // Perguntas Frequentes"
          heading="Tens dúvidas. Temos respostas."
          description="Se ainda tens alguma questão antes de entrares, é provável que esteja aqui."
          items={faqs}
        />
      </main>
      <Footer />
    </div>
  )
}
