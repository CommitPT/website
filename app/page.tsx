import Header from '@/src/components/Header'
import Hero from '@/src/components/Hero'
import Stats from '@/src/components/Stats'
import ForWho from '@/src/components/ForWho'
import About from '@/src/components/About'
import Inside from '@/src/components/Inside'
import Features from '@/src/components/Features'
import Team from '@/src/components/Team'
import SocialProof from '@/src/components/SocialProof'
import FAQ from '@/src/components/FAQ'
import Footer from '@/src/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ForWho />
        <About />
        <Inside />
        <Features />
        <Team />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
