import { InvitationCover } from './InvitationCover'

interface GaneshSectionProps {
  ganeshLayoutId?: string
}

export function GaneshSection({ ganeshLayoutId }: GaneshSectionProps) {
  return (
    <section
      id="welcome"
      className="relative isolate overflow-hidden bg-peach text-burgundy"
      aria-labelledby="invitation-title"
    >
      <InvitationCover
        titleId="invitation-title"
        ganeshLayoutId={ganeshLayoutId}
      />
    </section>
  )
}