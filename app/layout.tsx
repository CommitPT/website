import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import CookieConsent from '@/src/components/CookieConsent'
import './globals.css'

const BASE_URL = 'https://www.commitpt.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Comunidade CommitPT — Para de programar sozinho. Começa a fazer ship.',
  description:
    'A CommitPT é uma comunidade de crescimento de carreira para engenheiros de software portugueses. Grupos de responsabilidade semanais, revisões de código entre pares e acesso a profissionais da área.',
  keywords: [
    'commitpt',
    'bruno moisao',
    'comunidade programadores portugal',
    'comunidade programação',
    'engenheiros software portugal',
    'aprender a programar',
    'aprender programação',
    'aprender python',
    'aprender javascript',
    'aprender typescript',
    'aprender desenvolvimento web',
    'como começar a programar',
    'programação para iniciantes',
    'curso programação portugal',
    'crescimento carreira tech',
    'carreira desenvolvedor',
    'como arranjar emprego programação',
    'developer portugal',
    'programador portugal',
    'code review',
    'accountability programadores',
    'side projects',
    'build in public',
    'projetos pessoais programação',
    'comunidade tech portugal',
    'discord programadores',
  ],
  authors: [{ name: 'Bruno Moisão', url: 'https://www.linkedin.com/in/brunomoisao' }],
  creator: 'Bruno Moisão',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'Comunidade CommitPT — Para de programar sozinho. Começa a fazer ship.',
    description:
      'A CommitPT é uma comunidade de crescimento de carreira para engenheiros de software portugueses. Grupos de responsabilidade semanais, revisões de código entre pares e acesso a profissionais da área.',
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'Comunidade CommitPT — Para de programar sozinho. Começa a fazer ship.',
    description:
      'A CommitPT é uma comunidade de crescimento de carreira para engenheiros de software portugueses.',
    images: ['/commit_3_512w.webp'],
  },
  icons: {
    icon: '/commit_icon_256w.webp',
    apple: '/commit_icon_256w.webp',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-hidden"
        >
          Saltar para o conteúdo principal
        </a>
        {/* Ambient gradient orbs — fixed, behind everything */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="orb-1 absolute -left-64 -top-64 h-[800px] w-[800px] rounded-full bg-primary/[0.055] blur-[140px]" />
          <div className="orb-2 absolute -right-80 top-[35%] h-[700px] w-[700px] rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="orb-3 absolute bottom-[-10%] left-[15%] h-[600px] w-[600px] rounded-full bg-primary/[0.045] blur-[100px]" />
        </div>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
