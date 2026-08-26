import { ImageResponse } from 'next/og'
import { projects } from '@/src/data/projects'

export const runtime = 'edge'
export const alt = 'CommitPT — Projeto da Comunidade'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { id: string }
}

export default function Image({ params }: Props) {
  const project = projects.find((p) => p.id === params.id)

  const title = project?.title ?? 'Projeto CommitPT'
  const tagline = project?.tagline ?? 'Um projeto da comunidade CommitPT.'
  const tags = project?.tags ?? []

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#0B0E14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(7,236,236,0.07)',
          filter: 'blur(120px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(7,236,236,0.05)',
          filter: 'blur(100px)',
        }}
      />

      {/* Top bar: CommitPT logo + badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Monospace logo */}
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '20px',
              color: '#07ecec',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            ~/CommitPT
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(7,236,236,0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            background: 'rgba(7,236,236,0.05)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#07ecec',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#07ecec',
            }}
          >
            Projeto da Comunidade
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#07ecec',
            fontFamily: 'monospace',
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            color: '#8B949E',
            lineHeight: 1.4,
            maxWidth: '800px',
            fontWeight: 400,
          }}
        >
          {tagline}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  border: '1px solid rgba(7,236,236,0.25)',
                  borderRadius: '999px',
                  padding: '4px 14px',
                  background: 'rgba(7,236,236,0.07)',
                  color: '#07ecec',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(48,54,61,0.8)',
          paddingTop: '24px',
        }}
      >
        <span style={{ color: '#8B949E', fontSize: '15px' }}>commitpt.com/projects</span>
        <span style={{ color: '#8B949E', fontSize: '15px', fontFamily: 'monospace' }}>
          {'// Projetos reais. Experiência real.'}
        </span>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
