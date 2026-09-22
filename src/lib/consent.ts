// Consentimento de cookies: a chave e o evento são partilhados entre o aviso
// (CookieConsent) e quem precisa de saber que a decisão foi tomada — por exemplo a
// MobileCtaBar, que é fixa no fundo e não pode aparecer por baixo do aviso.

export const CONSENT_STORAGE_KEY = 'cookie_consent'

/** Disparado no `window` quando o visitante aceita ou recusa. */
export const CONSENT_EVENT = 'commitpt:cookie-consent'
