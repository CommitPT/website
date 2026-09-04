import { ImageResponse } from 'next/og'
import { getPublicProfile } from '@/src/lib/usm'

export const runtime = 'edge'
export const alt = 'Perfil de Membro — CommitPT'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#07ecec' }}
          />
          <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#07ecec' }}>
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
              border: '3px solid rgba(7,236,236,0.4)',
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
              color: '#F0F4F8',
            }}
          >
            {displayName}
          </div>

          <div
            style={{
              fontSize: '26px',
              color: '#07ecec',
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
                    border: '1px solid rgba(48,54,61,0.8)',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    background: 'rgba(21,25,34,0.8)',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '28px', color: '#07ecec' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '16px', color: '#8B949E' }}>{stat.label}</span>
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
          borderTop: '1px solid rgba(48,54,61,0.8)',
          paddingTop: '24px',
        }}
      >
        <span style={{ color: '#8B949E', fontSize: '15px' }}>{`commitpt.com/u/${username}`}</span>
        <span style={{ color: '#8B949E', fontSize: '15px', fontFamily: 'monospace' }}>
          {'// A comunidade para programadores portugueses.'}
        </span>
      </div>
    </div>,
    { ...size }
  )
}
