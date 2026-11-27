import type { WeddingConfig } from '../config/wedding'
import { getSiteBaseUrl } from './invitation'

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }

  link.href = href
}

export function applyWeddingSeo(
  config: WeddingConfig,
  canonicalPath = '/janti',
) {
  if (typeof document === 'undefined') return

  const siteBase = `${getSiteBaseUrl().replace(/\/+$/, '')}/`
  const ogImage = new URL('images/og-image.png', siteBase).toString()
  const canonicalUrl = new URL(canonicalPath.replace(/^\/+/, ''), siteBase).toString()

  document.title = config.seo.title
  upsertCanonical(canonicalUrl)

  upsertMeta('name', 'description', config.seo.description)
  upsertMeta('property', 'og:site_name', `${config.couple.groom.name.split(' ')[0]} & ${config.couple.bride.name.split(' ')[0]}`)
  upsertMeta('property', 'og:title', config.seo.ogTitle)
  upsertMeta('property', 'og:description', config.seo.ogDescription)
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('property', 'og:image:alt', config.seo.ogTitle)
  upsertMeta('name', 'twitter:title', config.seo.ogTitle)
  upsertMeta('name', 'twitter:description', config.seo.ogDescription)
  upsertMeta('name', 'twitter:image', ogImage)

  const schemaId = 'wedding-event-schema'
  let schema = document.getElementById(schemaId) as HTMLScriptElement | null

  if (!schema) {
    schema = document.createElement('script')
    schema.id = schemaId
    schema.type = 'application/ld+json'
    document.head.appendChild(schema)
  }

  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${config.couple.groom.name} & ${config.couple.bride.name} ${
      config.invitationType === 'reception' ? 'Reception' : 'Wedding'
    }`,
    description: config.seo.description,
    startDate: config.date.startDateTime,
    endDate: config.date.endDateTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [ogImage],
    location: {
      '@type': 'Place',
      name: config.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.venue.address,
        addressCountry: 'NP',
      },
    },
    organizer: {
      '@type': 'Person',
      name: `${config.couple.groom.name} & ${config.couple.bride.name}`,
    },
  })
}
