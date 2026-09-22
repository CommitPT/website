import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import MobileCtaBar from '@/src/components/MobileCtaBar'
import Benefits from '@/src/components/sections/Benefits'
import Comparison from '@/src/components/sections/Comparison'
import Faq from '@/src/components/sections/Faq'
import FinalCta from '@/src/components/sections/FinalCta'
import ForWho from '@/src/components/sections/ForWho'
import Founder from '@/src/components/sections/Founder'
import Hero from '@/src/components/sections/Hero'
import Pricing from '@/src/components/sections/Pricing'
import Testimonials from '@/src/components/sections/Testimonials'

// Ordem do funil — ver docs/PLANO-REDESIGN.md. Texto em src/content/home.ts.

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ForWho />
        <Benefits />
        <Founder />
        <Comparison />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
