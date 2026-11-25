import type { RefObject } from 'react'
import { ClosingSection } from './ClosingSection'
import { CoupleSection } from './CoupleSection'
import { EventSchedule } from './EventSchedule'
import { GaneshSection } from './GaneshSection'
import { GuestGreeting } from './GuestGreeting'
import { PhotoGallery } from './PhotoGallery'

import { VenueSection } from './VenueSection'
import { WeddingDetails } from './WeddingDetails'

interface InvitationPageProps {
  guestName: string | null
  opened: boolean
  mainRef: RefObject<HTMLElement | null>
}

export function InvitationPage({
  guestName,
  opened,
  mainRef,
}: InvitationPageProps) {
  return (
    <main
      ref={mainRef}
      id="invitation"
      aria-hidden={opened ? undefined : true}
      className="relative min-h-[100svh] bg-peach"
    >
      <GaneshSection />
      <CoupleSection />
      <GuestGreeting guestName={guestName} />
      <PhotoGallery />
      <WeddingDetails />
      <EventSchedule />
      <VenueSection />
      <ClosingSection />
    </main>
  )
}