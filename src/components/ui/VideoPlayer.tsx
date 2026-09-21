'use client'

import { trackEvent } from '@/src/lib/analytics'
import { Play } from 'lucide-react'
import { useState } from 'react'

interface VideoPlayerProps {
  /** ID do vídeo no YouTube. Sem ID mostra o estado "Vídeo em breve". */
  videoId: string | null
  title: string
}

/**
 * Fachada do YouTube: só mostra a miniatura até ao clique, e só então carrega
 * o iframe (youtube-nocookie). Evita ~500 KB de JS do player no carregamento.
 */
export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)

  if (videoId && playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&cc_load_policy=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      disabled={!videoId}
      onClick={() => {
        setPlaying(true)
        trackEvent('vsl_play', { location: 'hero' })
      }}
      aria-label={videoId ? `Ver vídeo: ${title}` : 'Vídeo em breve'}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-foreground/10 bg-background/60 bg-cover bg-center backdrop-blur-sm disabled:cursor-default"
      style={
        videoId
          ? { backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)` }
          : undefined
      }
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform group-enabled:group-hover:scale-105">
        <Play size={24} className="translate-x-0.5" fill="currentColor" />
      </span>
      {!videoId && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Vídeo em breve
        </span>
      )}
    </button>
  )
}
