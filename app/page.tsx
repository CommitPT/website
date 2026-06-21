import Header from '@/src/components/Header'
import Hero from '@/src/components/Hero'
import ForWho from '@/src/components/ForWho'
import About from '@/src/components/About'
import SocialProof from '@/src/components/SocialProof'
import Features from '@/src/components/Features'
import Team from '@/src/components/Team'
import Footer from '@/src/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <ForWho />
        <About />
        <SocialProof />
        <Features />
        <Team />
      </main>
      <Footer />
    </div>
  )
}
