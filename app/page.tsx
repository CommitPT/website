import Header from '@/src/components/Header'
import Hero from '@/src/components/Hero'
import About from '@/src/components/About'
import Features from '@/src/components/Features'
import Platform from '@/src/components/Platform'
import Footer from '@/src/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Platform />
      </main>
      <Footer />
    </div>
  )
}
