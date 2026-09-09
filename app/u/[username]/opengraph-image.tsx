import { ImageResponse } from 'next/og'
import { getPublicProfile } from '@/src/lib/usm'

export const runtime = 'edge'
export const alt = 'Perfil de Membro — CommitPT'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Paleta do @commitpt/design-system (ver theme.css) — mantém o OG image
// alinhado com o branding azul/roxo usado no resto do site.
const COLORS = {
  background: '#0A0F1A',
  surface: '#111827',
  border: '#2B3648',
  foreground: '#F8FAFC',
  muted: '#94A3B8',
  primary: '#1EA7FF',
  primaryLight: '#79C7FF',
  secondary: '#7C3AED',
}

interface Props {
  params: { username: string }
}

function shortName(fullName: string | null): string | null {
  if (!fullName) return null

  const parts = fullName.trim().split(/\s+/)
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1]}`
}

export default async function Image({ params }: Props) {
  const profile = await getPublicProfile(params.username)

  const displayName = shortName(profile?.fullName ?? null) ?? profile?.username ?? params.username
  const username = profile?.username ?? params.username
  const avatarUrl = profile?.githubUsername
    ? `https://github.com/${profile.githubUsername}.png`
    : null

  const stats = [
    profile?.stats && { label: 'XP', value: profile.stats.experience },
    profile?.streak && { label: 'streak', value: profile.streak.currentStreak },
    profile?.stats && { label: 'mensagens', value: profile.stats.messagesSent },
  ].filter(Boolean) as { label: string; value: number }[]

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Ambient glow — dois tons, espelhando o gradiente azul→roxo da marca */}
      <div
        style={{
          position: 'absolute',
          top: '-220px',
          left: '-180px',
          width: '620px',
          height: '620px',
          borderRadius: '50%',
          background: `${COLORS.primary}1a`,
          filter: 'blur(130px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-160px',
          right: '-160px',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: `${COLORS.secondary}1a`,
          filter: 'blur(120px)',
        }}
      />

      {/* Top bar: marca CommitPT + badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '20px',
              color: COLORS.foreground,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            ~/CommitPT
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: `1px solid ${COLORS.primary}4d`,
            borderRadius: '999px',
            padding: '6px 16px',
            background: `${COLORS.primary}0d`,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: COLORS.primaryLight,
            }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: '13px', color: COLORS.primaryLight }}>
            Perfil de Membro
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flex: 1,
        }}
      >
        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            width={160}
            height={160}
            alt=""
            style={{
              borderRadius: '50%',
              border: `3px solid ${COLORS.primary}66`,
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: COLORS.foreground,
            }}
          >
            {displayName}
          </div>

          <div
            style={{
              fontSize: '26px',
              color: COLORS.primaryLight,
              fontFamily: 'monospace',
            }}
          >
            {`@${username}`}
          </div>

          {stats.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '12px',
                    padding: '10px 20px',
                    background: COLORS.surface,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '28px',
                      color: COLORS.primaryLight,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '16px', color: COLORS.muted }}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: '24px',
        }}
      >
        <span style={{ color: COLORS.muted, fontSize: '15px' }}>
          {`commitpt.com/u/${username}`}
        </span>
        <span style={{ color: COLORS.muted, fontSize: '15px', fontFamily: 'monospace' }}>
          {'// A comunidade para programadores portugueses.'}
        </span>
      </div>
    </div>,
    { ...size }
  )
}
