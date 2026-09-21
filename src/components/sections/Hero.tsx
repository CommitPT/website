import Section from '@/src/components/layout/Section'
import CtaLink from '@/src/components/ui/CtaLink'
import VideoPlayer from '@/src/components/ui/VideoPlayer'
import { hero, stats } from '@/src/content/home'
import contributors from '@/src/contributors.json'
import { DISCORD_URL } from '@/src/lib/links'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Avatares reais para a prova social; 'github' é o placeholder de quem ainda não tem conta.
const proofAvatars = contributors
  .map((c) => c.githubUsername)
  .filter((username) => username && username !== 'github')
  .slice(0, 5)

// ── Component ─────────────────────────────────────────────────────────────────
//
// Desktop: texto à esquerda, painel com o degradê da visita + VSL à direita.
// Mobile: empilha pela ordem do wireframe (título → vídeo → CTAs).

export default function Hero() {
  return (
    <Section width="wide" bleed>
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* Texto */}
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-12 lg:py-24">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-pretty text-muted-foreground">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={DISCORD_URL} event="community_join_click" location="hero" size="lg">
              {hero.primaryCta}
            </CtaLink>
            <CtaLink
              href="#precos"
              event="pricing_anchor_click"
              location="hero"
              variant="outline"
              size="lg"
            >
              {hero.secondaryCta}
              <ArrowRight size={16} />
            </CtaLink>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-[11px] tracking-[0.15em] whitespace-nowrap text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="font-mono text-2xl text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Painel: degradê + VSL */}
        <div className="gradient-panel flex flex-col items-center justify-center gap-5 px-5 py-12 sm:px-8 lg:border-l lg:border-border lg:px-10">
          <div className="relative z-10 w-full max-w-xl">
            <VideoPlayer videoId={hero.videoId} title={hero.videoTitle} />
          </div>
          <div className="relative z-10 inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-background/70 py-1.5 pr-4 pl-1.5 backdrop-blur">
            <div className="flex -space-x-2">
              {proofAvatars.map((username) => (
                <Image
                  key={username}
                  src={`https://github.com/${username}.png?size=64`}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-foreground">{hero.proof}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
