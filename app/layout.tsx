import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'CommitPT — Ship code. Stay accountable. Grow.',
  description:
    'CommitPT is a community for programmers who want to stop coding alone and start building in public — through weekly accountability, code reviews, and real momentum.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-ink text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
