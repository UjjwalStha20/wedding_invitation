const MAX_GUEST_NAME_LENGTH = 80
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F-\u009F]/g
const WHITESPACE = /\s+/g

function truncateByGrapheme(value: string, maxLength: number): string {
  if (typeof Intl.Segmenter === 'function') {
    const segments = Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value),
      (segment) => segment.segment,
    )
    return segments.slice(0, maxLength).join('')
  }

  return Array.from(value).slice(0, maxLength).join('')
}

export function normalizeGuestName(
  raw: string | null | undefined,
): string | null {
  if (typeof raw !== 'string') return null

  const cleaned = raw
    .normalize('NFC')
    .replace(CONTROL_CHARACTERS, ' ')
    .replace(WHITESPACE, ' ')
    .trim()

  if (!cleaned) return null

  const truncated = truncateByGrapheme(cleaned, MAX_GUEST_NAME_LENGTH).trim()
  return truncated || null
}

export function getDisplayGuestName(
  guestName: string | null | undefined,
  genericGuestName: string,
) {
  return normalizeGuestName(guestName) ?? genericGuestName
}

export function getSiteBaseUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim()

  if (configured) {
    try {
      const url = new URL(configured)
      url.hash = ''
      url.search = ''
      return url.toString()
    } catch {
      // Fall through to the current origin when the environment value is invalid.
    }
  }

  if (typeof window !== 'undefined') {
    return new URL(import.meta.env.BASE_URL || '/', window.location.origin).toString()
  }

  return 'https://your-wedding-domain.com/'
}

export function buildInvitationUrl(
  guestName: string | null | undefined,
  baseUrl = getSiteBaseUrl(),
): string {
  const url = new URL(baseUrl)
  url.hash = ''

  const normalizedGuestName = normalizeGuestName(guestName)
  if (normalizedGuestName) {
    const params = new URLSearchParams()
    params.set('name', normalizedGuestName)
    url.search = params.toString().replace(/\+/g, '%20')
  } else {
    url.search = ''
  }

  return url.toString()
}

export function getWhatsAppSalutation(
  guestName: string | null | undefined,
  genericGuestName: string,
): string {
  const normalized = normalizeGuestName(guestName)

  if (!normalized) return genericGuestName
  if (/(?:\bji|जी)\s*$/i.test(normalized)) return normalized

  return `${normalized} ji`
}

export function buildWhatsAppMessage(
  guestName: string | null | undefined,
  invitationUrl: string,
  template: string,
  genericGuestName: string,
): string {
  return template
    .replaceAll('{name}', getWhatsAppSalutation(guestName, genericGuestName))
    .replaceAll('{url}', invitationUrl)
}

export function buildWhatsAppUrl(message: string, phone?: string): string {
  const digits = phone?.replace(/\D/g, '')
  const recipient = digits ? `${digits}` : ''
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`
}

export function buildShareUrl(
  guestName: string | null | undefined,
  invitationUrl: string,
  template: string,
  genericGuestName: string,
): string {
  return buildWhatsAppUrl(
    buildWhatsAppMessage(
      guestName,
      invitationUrl,
      template,
      genericGuestName,
    ),
  )
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0]?.toUpperCase() ?? '')
    .join('')
}
