export type EventIcon = 'mehendi' | 'haldi' | 'wedding' | 'reception'

export interface Photo {
  src: string
  alt: string
}

export interface GalleryPhoto extends Photo {
  caption?: string
}

export interface Person {
  name: string
  nepaliName: string
  parents: string
  parentsNepali?: string
  photo?: Photo
}

export interface WeddingDate {
  bs: string
  bsNepali: string
  gregorian: string
  isoDate: string
  startDateTime: string
  endDateTime: string
  day: string
  dayNepali: string
  muhurta: string
  muhurtaNepali: string
}

export interface Venue {
  name: string
  nepaliName: string
  address: string
  addressNepali?: string
  mapsUrl: string
}

export interface WeddingEvent {
  id: string
  name: string
  nepaliName: string
  date: string
  gregorianDate: string
  isoDate: string
  time: string
  venue: string
  address?: string
  description?: string
  icon: EventIcon
  enabled: boolean
}

export interface Family {
  side: string
  sideNepali: string
  names: string[]
}

export interface WeddingConfig {
  couple: {
    groom: Person
    bride: Person
    blessing: string
    invitationLine: string
  }
  hero: {
    sanskrit: string
    nepali: string
    english: string
    greeting: string
  }
  date: WeddingDate
  venue: Venue
  events: WeddingEvent[]
  families: Family[]
  messages: {
    guestInvitation: string
    genericGuestName: string
    closing: string
    closingSalutation: string
    whatsappTemplate: string
  }
  photos?: {
    couple?: Photo
    gallery?: GalleryPhoto[]
  }
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
  }
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: 'Rakesh Shrestha',
      nepaliName: 'राखेश श्रीस्थ',
      parents: 'Mr. Rajendra & Mrs. Kamala Sharma',
      parentsNepali: 'श्री राजेन्द्र तथा श्रीमती कमला शर्मा',
    },
    bride: {
      name: 'Prumu Lama',
      nepaliName: 'प्रुम लामा',
      parents: 'Mr. Rajendra & Mrs. Kamala Sharma',
      parentsNepali: 'श्री राजेन्द्र तथा श्रीमती कमला शर्मा',
    },
    blessing: 'Together with the blessings of our families',
    invitationLine: 'Joyfully invite you to celebrate their wedding',
  },
  hero: {
    sanskrit: '॥ श्री गणेशाय नमः ॥',
    nepali: '॥ शुभ विवाह ॥',
    english: 'Wedding Invitation',
    greeting: 'With the blessings of Lord Ganesha',
  },
  date: {
    bs: '2083 Kartik 21',
    bsNepali: '२०८३ कार्तिक २१',
    gregorian: 'Saturday, 7 November 2026',
    isoDate: '2026-11-07',
    startDateTime: '2026-11-07T10:45:00+05:45',
    endDateTime: '2026-11-07T12:30:00+05:45',
    day: 'Saturday',
    dayNepali: 'शनिबार',
    muhurta: '10:45 AM – 12:30 PM',
    muhurtaNepali: '१०:४५ – १२:३०',
  },
  venue: {
    name: 'Hyatt Regency Kathmandu',
    nepaliName: 'ह्यात रिजेन्सी काठमाडौं',
    address: 'Taragaon, Boudha, Kathmandu 44600, Nepal',
    addressNepali: 'तारागाउँ, बौद्ध, काठमाडौं ४४६००, नेपाल',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Kathmandu+Taragaon+Boudha',
  },
  events: [
    {
      id: 'mehendi',
      name: 'Mehendi',
      nepaliName: 'मेहेन्दी',
      date: '2083 Kartik 19',
      gregorianDate: 'Thursday, 5 November 2026',
      isoDate: '2026-11-05',
      time: '2:00 PM onwards',
      venue: 'Thapa Residence',
      address: 'Suryabinayak, Bhaktapur',
      description:
        'An afternoon of henna, music and laughter as we begin the celebrations.',
      icon: 'mehendi',
      enabled: true,
    },
    {
      id: 'haldi',
      name: 'Haldi',
      nepaliName: 'हल्दी',
      date: '2083 Kartik 20',
      gregorianDate: 'Friday, 6 November 2026',
      isoDate: '2026-11-06',
      time: '10:00 AM onwards',
      venue: 'Sharma Residence',
      address: 'Budhanilkantha, Kathmandu',
      description:
        'A morning of turmeric blessings, sweets and warm family rituals.',
      icon: 'haldi',
      enabled: true,
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      nepaliName: 'विवाह',
      date: '2083 Kartik 21',
      gregorianDate: 'Saturday, 7 November 2026',
      isoDate: '2026-11-07',
      time: 'Muhurta 10:45 AM – 12:30 PM',
      venue: 'Hyatt Regency Kathmandu',
      address: 'Taragaon, Boudha, Kathmandu',
      description:
        'The sacred union, performed with Vedic rituals, family blessings and the sound of the shehnai.',
      icon: 'wedding',
      enabled: true,
    },
    {
      id: 'reception',
      name: 'Reception',
      nepaliName: 'रिसेप्सन',
      date: '2083 Kartik 22',
      gregorianDate: 'Sunday, 8 November 2026',
      isoDate: '2026-11-08',
      time: '6:00 PM onwards',
      venue: 'Hyatt Regency Kathmandu',
      address: 'Taragaon, Boudha, Kathmandu',
      description:
        'An evening of dinner, music and celebration with our near and dear ones.',
      icon: 'reception',
      enabled: true,
    },
  ],
  families: [
    {
      side: 'Sharma Family',
      sideNepali: 'शर्मा परिवार',
      names: ['Mr. Rajendra Sharma', 'Mrs. Kamala Sharma'],
    },
    {
      side: 'Thapa Family',
      sideNepali: 'थापा परिवार',
      names: ['Mr. Bishnu Thapa', 'Mrs. Ganga Thapa'],
    },
  ],
  messages: {
    guestInvitation:
      'We cordially invite you to join us and bless our new journey together.',
    genericGuestName: 'Family and Friends',
    closing:
      'Your gracious presence and blessings will make our celebration truly special.',
    closingSalutation: 'With warm regards and gratitude,',
    whatsappTemplate:
      'Namaste {name} 🙏\n\nWhatsApp: +977-9808113156\n\nWe warmly invite you and your family to celebrate our wedding.\n\nPlease open your personalized wedding invitation using the link below:\n\n{url}\n\nWe look forward to your presence and blessings! ❤️',
  },
  photos: {
    // Add your own optimised portrait here to replace the monogram.
    // couple: { src: '/images/couple.jpg', alt: 'Aarav and Sita' },
    gallery: [
      {
        src: '/images/gallery/moment-1.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'Where it all began',
      },
      {
        src: '/images/gallery/moment-2.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'Blessings from our families',
      },
      {
        src: '/images/gallery/moment-3.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'Celebrations with loved ones',
      },
      {
        src: '/images/gallery/moment-4.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'The haldi ceremony',
      },
      {
        src: '/images/gallery/moment-5.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'Under the temple arch',
      },
      {
        src: '/images/gallery/moment-6.svg',
        alt: 'Traditional Nepali wedding artwork placeholder',
        caption: 'A promise for forever',
      },
    ],
  },
  seo: {
    title: 'Rakesh & Prumu — Shubh Vivah | Nepali Wedding Invitation',
    description:
      'With the blessings of our families, Rakesh Shrestha and Prumu Lama joyfully invite you to celebrate their wedding on 7 November 2026 in Kathmandu.',
    ogTitle: 'Rakesh & Prumu — Shubh Vivah',
    ogDescription:
      'Joyfully inviting you to celebrate our wedding — 2083 Kartik 21, Kathmandu.',
  },
}
