import { ExternalLink } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import {
  buildInvitationUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeGuestName,
} from '../utils/invitation'
import { GoldLink } from './ui/GoldButton'
import { Modal } from './ui/Modal'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

interface InvitationGeneratorProps {
  open: boolean
  onClose: () => void
}

export function InvitationGenerator({
  open,
  onClose,
}: InvitationGeneratorProps) {
  const [name, setName] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!copied) return

    const timer = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const whatsappHref = generatedUrl
    ? buildWhatsAppUrl(buildWhatsAppMessage(name, generatedUrl))
    : ''

  function handleNameChange(value: string) {
    setName(value.slice(0, 80))
    setError(null)
    setGeneratedUrl('')
    setCopied(false)
    setStatus('')
  }

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeGuestName(name)

    if (!normalized) {
      setError('Please enter a guest name to create a personalised invitation.')
      setGeneratedUrl('')
      setStatus('')
      return
    }

    const url = buildInvitationUrl(normalized)
    setGeneratedUrl(url)
    setError(null)
    setCopied(false)
    setStatus(`Invitation link generated for ${normalized}.`)
  }
  return (
    <Modal open={open} onClose={onClose} titleId="generator-title">
      <div className="bg-maroon px-6 pb-6 pt-10 text-center text-ivory">
        <p
          lang="ne"
          className="font-devanagari text-sm tracking-[0.08em] text-gold-light"
        >
          ॥ शुभ विवाह ॥
        </p>
        <h2
          id="generator-title"
          className="mt-1 font-display text-2xl tracking-[0.04em] sm:text-3xl"
        >
          Personal Invitation
        </h2>
        <p className="mx-auto mt-2 max-w-sm font-body text-base italic text-ivory/65">
          Create a private link with your guest&apos;s name on the invitation.
        </p>
      </div>

      <div className="px-6 pb-7 pt-6 sm:px-8">
        <form onSubmit={handleGenerate}>
          <label
            htmlFor="guest-name"
            className="eyebrow block text-gold-deep"
          >
            Guest&apos;s name
          </label>
          <input
            id="guest-name"
            name="guestName"
            type="text"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="e.g. Ram Sharma"
            maxLength={80}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="done"
            data-autofocus
            aria-describedby={error ? 'guest-name-hint guest-name-error' : 'guest-name-hint'}
            aria-invalid={Boolean(error)}
            className="mt-2 w-full border border-gold/45 bg-ivory px-4 py-3 font-body text-lg text-burgundy placeholder:text-burgundy/35 focus:border-gold-deep focus:outline-none"
          />
          <p id="guest-name-hint" className="mt-1.5 text-sm text-burgundy/55">
            This will appear as &ldquo;Dear{' '}
            {normalizeGuestName(name) ?? 'your guest'}&rdquo; when the
            invitation opens.
          </p>
          {error ? (
            <p
              id="guest-name-error"
              role="alert"
              className="mt-2 text-sm text-royal"
            >
              {error}
            </p>
          ) : null}

          </form>

        <p className="sr-only" aria-live="polite">
          {status}
        </p>

        {generatedUrl ? (
          <div className="mt-6 border border-gold/35 bg-ivory-deep/40 p-4">
            <p className="eyebrow text-[0.55rem] text-gold-deep">
              Personalised link
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <input
                value={generatedUrl}
                readOnly
                aria-label="Personalised invitation link"
                onFocus={(event) => event.currentTarget.select()}
                className="w-full border border-gold/30 bg-ivory px-3 py-2.5 font-body text-sm text-burgundy/80 focus:border-gold-deep focus:outline-none"
              />
              <div className="flex flex-col sm:flex-row">
                <GoldLink
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="quiet"
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Preview
                </GoldLink>
              </div>
              <GoldLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Share on WhatsApp
              </GoldLink>
            </div>
          </div>
        ) : null}

        <p className="mt-5 border-t border-gold/20 pt-4 text-center font-body text-sm leading-relaxed text-burgundy/55">
          The guest&apos;s name appears when they open their link. Link
          previews on WhatsApp always show the main wedding card.
        </p>
      </div>
    </Modal>
  )
}
