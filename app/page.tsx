import dynamic from 'next/dynamic'
import { selectFaqs } from '@/src/data/faqs'
import Header from '@/src/components/Header'
import HeroBoard from '@/src/components/HeroBoard'
import ProjectsBoard from '@/src/components/ProjectsBoard'
import PeopleBoard from '@/src/components/PeopleBoard'
import Events from '@/src/components/Events'
import Footer from '@/src/components/Footer'
import CommitPlusSection from '@/src/components/CommitPlusSection'
import { getContributors } from '@/src/lib/contributors'
import { getWhopCustomerCount } from '@/src/lib/whop'

const SocialProof = dynamic(() => import('@/src/components/SocialProof'))
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
  const [contributors, commitPlusCount] = await Promise.all([
    getContributors(),
    getWhopCustomerCount(),
  ])

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <HeroBoard contributors={contributors} commitPlusCount={commitPlusCount} />
        <ProjectsBoard />
        <PeopleBoard contributors={contributors} />
        <Events />
        <SocialProof />
        <CommitPlusSection />
        <FAQ
          heading="Tens dúvidas. Temos respostas."
          description="As perguntas que costumam aparecer antes de entrares."
          items={selectFaqs(FAQ_IDS)}
        />
      </main>
      <Footer />
    </div>
  )
}
