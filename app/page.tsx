import Header from '@/src/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center ">
      <Header />
      {/* <div className="flex flex-col gap-4 w-2/3">
        <main id="main-content" className="flex min-h-[60vh] items-center justify-center px-6">
          <h1 className="font-mono text-3xl font-bold text-foreground">Hello, world.</h1>
        </main>
        <Footer />
      </div> */}
    </div>
  )
}
