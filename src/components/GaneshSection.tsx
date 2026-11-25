import { InvitationCover } from './InvitationCover'

export function GaneshSection() {
  return (
    <section
      id="welcome"
      className="relative isolate overflow-hidden bg-peach text-burgundy"
      aria-labelledby="invitation-title"
    >
      <InvitationCover titleId="invitation-title" />
    </section>
  )
}