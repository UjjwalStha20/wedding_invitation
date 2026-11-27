export type EventIcon = 'wedding' | 'reception'

export interface Photo {
  src: string
  alt: string
}

export interface GalleryPhoto extends Photo {
  caption?: string
  fit?: 'cover' | 'contain'
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
  dateNepali?: string
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
  invitationType: 'wedding' | 'reception'
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
  invitationType: 'wedding',
  couple: {
    groom: {
      name: 'Rakesh Shrestha',
      nepaliName: 'राकेश श्रेष्ठ',
      parents: 'Mr. Ganesh Shrestha & Mrs. Urmila Shrestha',
      parentsNepali: 'श्री गणेश श्रेष्ठ तथा श्रीमती उर्मिला श्रेष्ठ',
    },
    bride: {
      name: 'Prumu Waiba Lama',
      nepaliName: 'प्रुमु वाईवा लामा',
      parents: 'Mr. Baldev Waiba Lama & Mrs. Sonu Waiba Lama',
      parentsNepali: 'श्री बलदेव वाईवा लामा तथा श्रीमती सोनु वाईवा लामा',
    },
    blessing: "With our families' blessings",
    invitationLine: 'Please join us to celebrate our wedding.',
  },
  hero: {
    sanskrit: '॥ श्री गणेशाय नमः ॥',
    nepali: '॥ शुभ विवाह ॥',
    english: 'Wedding Invitation',
    greeting: 'Blessed by Lord Ganesha',
  },
  date: {
    bs: '2083 Mangsir 20',
    bsNepali: '२० मंसिर २०८३',
    gregorian: 'Sunday, 6 December 2026',
    isoDate: '2026-12-06',
    startDateTime: '2026-12-06T10:45:00+05:45',
    endDateTime: '2026-12-06T12:30:00+05:45',
    day: 'Sunday',
    dayNepali: 'आइतबार',
    muhurta: '10:45 AM – 12:30 PM',
    muhurtaNepali: '१०:४५ – १२:३०',
  },
  venue: {
    name: 'Aagantuk Resort, Dhulikhel',
    nepaliName: 'आगन्तुक रिसोर्ट, धुलिखेल',
    address: 'Dhulikhel, Nepal',
    addressNepali: 'धुलिखेल, नेपाल',
    mapsUrl:
      'https://www.google.com/maps/place/Aagantuk+Resort,+Dhulikhel/@27.632734,85.540401,17z/data=!3m1!4b1!4m9!3m8!1s0x39eb0fa54ce4c72d:0x485a4c16823cb4d2!5m2!4m1!1i2!8m2!3d27.6327293!4d85.5429759!16s%2Fg%2F11q8tj299s?entry=ttu&g_ep=EgoyMDI2MTEyMi4wIKXMDSoASAFQAw%3D%3D',
  },
  events: [
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      nepaliName: 'विवाह',
      date: '2083 Mangsir 20',
      dateNepali: '२० मंसिर २०८३',
      gregorianDate: 'Sunday, 6 December 2026',
      isoDate: '2026-12-06',
      time: 'Muhurta 10:45 AM – 12:30 PM',
      venue: 'Balkhu, Kathmandu → Himalayan Durbar Banquet, Hetauda',
      address: 'Balkhu, Kathmandu to Himalayan Durbar Banquet, Hetauda',
      description:
        'Join us for the wedding ceremony, with Vedic rituals, family blessings, and shehnai music.',
      icon: 'wedding',
      enabled: true,
    },
    {
      id: 'reception',
      name: 'Reception',
      nepaliName: 'रिसेप्सन',
      date: '2083 Mangsir 22',
      dateNepali: '२२ मंसिर २०८३',
      gregorianDate: 'Tuesday, 8 December 2026',
      isoDate: '2026-12-08',
      time: '3:00 PM – 8:00 PM',
      venue: 'Aagantuk Resort, Dhulikhel',
      address: 'Dhulikhel, Nepal',
      description:
        'Join us for dinner, music, and an evening with family and friends.',
      icon: 'reception',
      enabled: true,
    },
  ],
  families: [
    {
      side: 'Shrestha Family',
      sideNepali: 'श्रेष्ठ परिवार',
      names: ['गणेश श्रेष्ठ', 'उर्मिला श्रेष्ठ'],
    },
    {
      side: 'Waiba Lama Family',
      sideNepali: 'वाईवा लामा परिवार',
      names: ['बलदेव वाईवा लामा', 'सोनु वाईवा लामा'],
    },
  ],
  messages: {
    guestInvitation:
      'Please join us and bless our new life together.',
    genericGuestName: 'You are invited',
    closing:
      'Your presence and blessings will make our day special.',
    closingSalutation: 'With love,',
    whatsappTemplate:
      'Namaste {name} 🙏\n\nWhatsApp: +977-9808113156\n\nWe invite you and your family to celebrate our wedding.\n\nOpen your invitation using this link:\n\n{url}\n\nWe hope you can join us and bless us! ❤️',
  },
  photos: {
    // Add an optimized portrait here to replace the monogram.
    // couple: { src: '/images/couple.jpg', alt: 'Rakesh and Prumu' },
    gallery: [
      {
        src: '/images/gallery/moment-1.jpg',
        alt: 'Rakesh and Prumu with friends in an early photograph',
        caption: 'Where It All Began ❤️',
      },
      {
        src: '/images/gallery/moment-2.jpg',
        alt: 'Rakesh and Prumu together on a quiet road',
        caption: 'A Journey of Two Hearts',
      },
      {
        src: '/images/gallery/moment-3.jpg',
        alt: 'Rakesh and Prumu smiling in front of the mountains',
        caption: 'Adventures Hand in Hand',
      },
      {
        src: '/images/gallery/moment-4.jpg',
        alt: 'Rakesh and Prumu dancing together at their wedding',
        caption: 'Dancing Into Forever',
        fit: 'contain',
      },
      {
        src: '/images/gallery/moment-5.jpg',
        alt: 'Rakesh and Prumu exchanging garlands during the wedding ceremony',
        caption: 'The Promise of Forever',
        fit: 'contain',
      },
      {
        src: '/images/gallery/moment-6.jpg',
        alt: 'Rakesh and Prumu surrounded by their families at the wedding',
        caption: 'Blessings from Our Families',
        fit: 'contain',
      },
    ],
  },
  seo: {
    title: 'Rakesh & Prumu — Shubh Vivah | Nepali Wedding Invitation',
    description:
      'Rakesh Shrestha and Prumu Waiba Lama invite you to celebrate their wedding on २० मंसिर २०८३ (6 December 2026).',
    ogTitle: 'Rakesh & Prumu — Shubh Vivah',
    ogDescription:
      'Join us to celebrate our wedding on २० मंसिर २०८३ (6 December 2026).',
  },
}
