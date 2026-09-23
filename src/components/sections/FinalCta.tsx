import Section from '@/src/components/layout/Section'
import CtaLink from '@/src/components/ui/CtaLink'
import { finalCta } from '@/src/content/home'
import { DISCORD_URL } from '@/src/lib/links'
import { Typography } from '@commitpt/design-system'

// Sem degradê aqui: encostada ao degradê que está fora da moldura, ficavam dois
// degradês a competir. O fecho visual da página é o rodapé.

export default function FinalCta() {
  return (
    <Section width="wide" bleed>
      <div className="px-5 py-20 text-center sm:px-8 md:py-28">
        <div className="mx-auto max-w-xl">
          <Typography variant="h2" className="tracking-tight text-balance">
            {finalCta.title}
          </Typography>
          <p className="mt-4 text-pretty text-foreground/80">{finalCta.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href={DISCORD_URL} event="community_join_click" location="final" size="lg">
              Entrar grátis
            </CtaLink>
            <CtaLink
              href="#precos"
              event="pricing_anchor_click"
              location="final"
              variant="outline"
              size="lg"
            >
              Ver o Commit+
            </CtaLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
