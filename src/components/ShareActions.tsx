import { Link2, PenLine } from 'lucide-react'
import { useMemo } from 'react'
import { copyText } from '../utils/clipboard'
import { buildInvitationUrl, buildShareUrl } from '../utils/invitation'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

interface ShareActionsProps {
  guestName: string | null
  onOpenGenerator: () => void
  notify: (message: string, tone?: 'success' | 'error') => void
}

const buttonClass =
  'group grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-maroon text-gold-light shadow-luxe transition-colors duration-300 hover:border-gold hover:bg-royal hover:text-gold-light'

export function ShareActions({
  guestName,
  onOpenGenerator,
  notify,
}: ShareActionsProps) {
  const invitationUrl = useMemo(
    () => buildInvitationUrl(guestName),
    [guestName],
  )
  const whatsappUrl = useMemo(() => buildShareUrl(guestName), [guestName])

  async function handleCopy() {
    const success = await copyText(invitationUrl)
    notify(
      success
        ? 'Your personalised invitation link has been copied.'
        : 'Could not copy the link. Please use the generator to copy it manually.',
      success ? 'success' : 'error',
    )
  }

  return (
    <div
      className="fixed right-4 z-40 flex flex-col gap-2.5"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share this invitation on WhatsApp"
        title="Share on WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className={buttonClass}
        aria-label="Copy your personalised invitation link"
        title="Copy invitation link"
      >
        <Link2 className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onOpenGenerator}
        className={buttonClass}
        aria-label="Create a personalised invitation"
        title="Create invitation"
      >
        <PenLine className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  )
}
