import { weddingConfig, type WeddingConfig } from './wedding'

const receptionEvent = weddingConfig.events.find(
  (event) => event.id === 'reception',
)

if (!receptionEvent) {
  throw new Error('Reception event is missing from the wedding configuration.')
}

export const receptionConfig: WeddingConfig = {
  ...weddingConfig,
  invitationType: 'reception',
  couple: {
    ...weddingConfig.couple,
    invitationLine: 'Please join us for an evening of celebration.',
  },
  hero: {
    ...weddingConfig.hero,
    nepali: '॥ रिसेप्सन निमन्त्रणा ॥',
    english: 'Reception Invitation',
    greeting: 'Celebrating with family and friends',
  },
  date: {
    ...weddingConfig.date,
    bs: receptionEvent.date,
    bsNepali: receptionEvent.dateNepali ?? '',
    gregorian: receptionEvent.gregorianDate,
    isoDate: receptionEvent.isoDate,
    startDateTime: `${receptionEvent.isoDate}T15:00:00+05:45`,
    endDateTime: `${receptionEvent.isoDate}T20:00:00+05:45`,
    day: 'Tuesday',
    dayNepali: 'मंगलबार',
    muhurta: receptionEvent.time,
    muhurtaNepali: '३:०० बजे देखि ८:०० बजे सम्म',
  },
  venue: {
    ...weddingConfig.venue,
    name: receptionEvent.venue,
    address: receptionEvent.address ?? weddingConfig.venue.address,
  },
  events: [receptionEvent],
  messages: {
    ...weddingConfig.messages,
    guestInvitation: 'Please join us at our reception and bless us.',
    closing: 'Your presence will make our reception even more special.',
    whatsappTemplate:
      'Namaste {name} 🙏\n\nWe invite you to celebrate our reception.\n\nOpen your invitation using this link:\n\n{url}\n\nWe hope you can join us! ❤️',
  },
  seo: {
    title: 'Rakesh & Prumu — Reception Invitation',
    description:
      'Rakesh Shrestha and Prumu Waiba Lama invite you to celebrate their reception on २२ मंसिर २०८३ (8 December 2026).',
    ogTitle: 'Rakesh & Prumu — Reception Invitation',
    ogDescription:
      'Join Rakesh and Prumu for their reception on २२ मंसिर २०८३ (8 December 2026).',
  },
}
