import type { ReactNode } from 'react'

interface FrameProps {
  children: ReactNode
}

/**
 * Moldura exterior do site: coluna `max-w-wide` com as calhas exteriores e
 * fundo sólido. O degradê (SiteBackground) só aparece fora dela. As calhas
 * interiores são desenhadas por cada Section de largura `content`.
 */
export default function Frame({ children }: FrameProps) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-wide flex-col bg-background lg:border-x lg:border-border">
      {children}
    </div>
  )
}
