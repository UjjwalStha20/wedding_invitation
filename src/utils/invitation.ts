import { weddingConfig } from '../config/wedding'

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

export function getGuestName(search?: string): string | null {
  const searchString =
    search ?? (typeof window !== 'undefined' ? window.location.search : '')

  try {
    return normalizeGuestName(new URLSearchParams(searchString).get('to'))
  } catch {
    return null
  }
}

export function getDisplayGuestName(guestName: string | null | undefined) {
  return normalizeGuestName(guestName) ?? weddingConfig.messages.genericGuestName
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
  const normalized = normalizeGuestName(guestName)
  const url = new URL(baseUrl)
  url.hash = ''

  if (normalized) {
    const params = new URLSearchParams()
    params.set('to', normalized)
    url.search = params.toString().replace(/\+/g, '%20')
  } else {
    url.search = ''
  }

  return url.toString()
}

export function getWhatsAppSalutation(
  guestName: string | null | undefined,
): string {
  const normalized = normalizeGuestName(guestName)

  if (!normalized) return weddingConfig.messages.genericGuestName
  if (/(?:\bji|जी)\s*$/i.test(normalized)) return normalized

  return `${normalized} ji`
}

export function buildWhatsAppMessage(
  guestName: string | null | undefined,
  invitationUrl: string,
): string {
  return weddingConfig.messages.whatsappTemplate
    .replaceAll('{name}', getWhatsAppSalutation(guestName))
    .replaceAll('{url}', invitationUrl)
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function buildShareUrl(
  guestName: string | null | undefined,
  baseUrl = getSiteBaseUrl(),
): string {
  const invitationUrl = buildInvitationUrl(guestName, baseUrl)
  return buildWhatsAppUrl(buildWhatsAppMessage(guestName, invitationUrl))
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0]?.toUpperCase() ?? '')
    .join('')
}
