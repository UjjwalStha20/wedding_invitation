import { Link2 } from 'lucide-react'
import { useMemo } from 'react'
import { copyText } from '../utils/clipboard'
import { buildInvitationUrl, buildShareUrl } from '../utils/invitation'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

interface ShareActionsProps {
  guestName: string | null
  notify: (message: string, tone?: 'success' | 'error') => void
}

const buttonClass =
  'group grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-maroon text-gold-light shadow-luxe transition-colors duration-300 hover:border-gold hover:bg-royal hover:text-gold-light'

export function ShareActions({
  guestName,
  notify,
}: ShareActionsProps) {
  const weddingConfig = useWeddingConfig()
  const invitationUrl = useMemo(
    () => buildInvitationUrl(guestName),
    [guestName],
  )
  const whatsappUrl = useMemo(
    () =>
      buildShareUrl(
        guestName,
        invitationUrl,
        weddingConfig.messages.whatsappTemplate,
        weddingConfig.messages.genericGuestName,
      ),
    [
      guestName,
      invitationUrl,
      weddingConfig.messages.genericGuestName,
      weddingConfig.messages.whatsappTemplate,
    ],
  )

  async function handleCopy() {
    const success = await copyText(invitationUrl)
    notify(
      success
        ? 'Invitation link copied.'
        : 'Could not copy the link.',
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
        aria-label="Copy your invitation link"
        title="Copy invitation link"
      >
        <Link2 className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  )
}
