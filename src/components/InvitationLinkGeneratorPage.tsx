import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  Copy,
  MessageCircle,
  RotateCcw,
  Share2,
} from 'lucide-react'
import { receptionConfig } from '../config/reception'
import { weddingConfig } from '../config/wedding'
import { copyText } from '../utils/clipboard'
import {
  buildInvitationUrl,
  buildWhatsAppMessage,
  getSiteBaseUrl,
  normalizeGuestName,
} from '../utils/invitation'
import { FloralCorner } from './decorations/FloralCorner'

type InvitationType = 'wedding' | 'reception'

type Feedback = {
  message: string
  tone: 'success' | 'error'
}

export function InvitationLinkGeneratorPage() {
  const [guestNameInput, setGuestNameInput] = useState('')
  const [generatedName, setGeneratedName] = useState<string | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [generatedInvitationType, setGeneratedInvitationType] =
    useState<InvitationType>('wedding')
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const generatedConfig =
    generatedInvitationType === 'reception' ? receptionConfig : weddingConfig
  const eventDetails = generatedConfig.events
    .filter((event) => event.enabled)
    .map(
      (event) =>
        `${event.name} / ${event.nepaliName}\nDate: ${event.dateNepali ?? event.date} (${event.gregorianDate})\nTime: ${event.time}\nLocation: ${event.venue}`,
    )
    .join('\n\n')
  const invitationMessage = generatedName && generatedUrl
    ? buildWhatsAppMessage(
        generatedName,
        generatedUrl,
        generatedConfig.messages.whatsappTemplate.replace(
          'Open your invitation using this link:',
          `${eventDetails}\n\n“${generatedConfig.seo.ogDescription}”\n\nOpen your invitation using this link:`,
        ),
        generatedConfig.messages.genericGuestName,
      )
    : ''

  function generateInvitationLink(invitationType: InvitationType) {
    const name = normalizeGuestName(guestNameInput)

    if (!name) {
      setFeedback({ message: 'Please enter a guest name.', tone: 'error' })
      return
    }

    const baseUrl = new URL(getSiteBaseUrl())
    baseUrl.pathname = invitationType === 'reception' ? '/reception' : '/janti'

    setGeneratedName(name)
    setGeneratedUrl(buildInvitationUrl(name, baseUrl.toString()))
    setGeneratedInvitationType(invitationType)
    setFeedback(null)
  }

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    generateInvitationLink('wedding')
  }

  function handleReset() {
    setGuestNameInput('')
    setGeneratedName(null)
    setGeneratedUrl(null)
    setGeneratedInvitationType('wedding')
    setFeedback(null)
  }

  async function copyInvitationLink(fallbackMessage?: string) {
    if (!generatedUrl) return

    try {
      await navigator.clipboard.writeText(generatedUrl)
      setFeedback({
        message: fallbackMessage ?? 'Invitation link copied.',
        tone: 'success',
      })
    } catch {
      setFeedback({
        message: 'Could not copy the link. Please copy it from the field above.',
        tone: 'error',
      })
    }
  }

  async function copyInvitationMessageAndOpenMessengerApp() {
    if (!generatedUrl) return

    const copyPromise = copyText(invitationMessage)
    window.location.href = 'fb-messenger://'

    const copied = await copyPromise
    if (copied) {
      setFeedback({
        message: 'Full invitation copied. Choose a Messenger conversation and paste the message.',
        tone: 'success',
      })
    } else {
      setFeedback({
        message: 'Messenger opened, but the invitation could not be copied. Copy the invitation link above.',
        tone: 'error',
      })
    }
  }

  async function copyInvitationMessageAndOpenWhatsAppApp() {
    if (!generatedUrl) return

    const copyPromise = copyText(invitationMessage)
    window.location.href = 'whatsapp://send'

    const copied = await copyPromise
    setFeedback({
      message: copied
        ? 'Full invitation copied. Choose a WhatsApp chat and paste the message.'
        : 'WhatsApp opened, but the invitation could not be copied. Copy the invitation link above.',
      tone: copied ? 'success' : 'error',
    })
  }

  async function handleShare() {
    if (!generatedUrl) return

    if (!navigator.share) {
      await copyInvitationMessageAndOpenMessengerApp()
      return
    }

    try {
      await navigator.share({
        title: generatedConfig.seo.title,
        text: invitationMessage,
      })
      setFeedback({ message: 'Invitation shared.', tone: 'success' })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      await copyInvitationMessageAndOpenMessengerApp()
    }
  }

  async function handleWhatsAppShare() {
    if (!generatedUrl) return

    if (!navigator.share) {
      await copyInvitationMessageAndOpenWhatsAppApp()
      return
    }

    try {
      await navigator.share({
        title: generatedConfig.seo.title,
        text: invitationMessage,
      })
      setFeedback({ message: 'Invitation shared.', tone: 'success' })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      await copyInvitationMessageAndOpenWhatsAppApp()
    }
  }

  async function handleMessengerShare() {
    if (!generatedUrl) return

    if (!navigator.share) {
      await copyInvitationMessageAndOpenMessengerApp()
      return
    }

    try {
      await navigator.share({
        title: generatedConfig.seo.title,
        text: invitationMessage,
      })
      setFeedback({
        message: 'Choose Messenger from the share menu to send the invitation.',
        tone: 'success',
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      await copyInvitationMessageAndOpenMessengerApp()
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-cream px-5 py-12 text-burgundy">
      <FloralCorner
        corner="top-left"
        className="w-[clamp(110px,20vw,220px)]"
        opacity={0.45}
      />
      <FloralCorner
        corner="bottom-right"
        className="w-[clamp(110px,20vw,220px)]"
        opacity={0.4}
      />

      <section
        className="relative z-10 w-full max-w-xl rounded-[2rem] border border-gold/30 bg-ivory-soft/90 px-6 py-10 shadow-card sm:px-12 sm:py-14"
        aria-labelledby="generator-title"
      >
        <a
          href="/janti"
          className="inline-flex items-center gap-2 font-display text-sm text-brown transition-colors hover:text-burgundy"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Return to invitation
        </a>

        <div className="mt-8 text-center">
          <p lang="ne" className="font-devanagari text-lg text-rose">
            सादर निमन्त्रणा
          </p>
          <p className="eyebrow mt-2 text-brown/70">Personal invitation link</p>
          <h1
            id="generator-title"
            className="mt-3 font-display text-3xl text-burgundy sm:text-4xl"
          >
            Create a guest link
          </h1>
          <p className="mx-auto mt-3 max-w-md font-body text-base text-brown">
            Enter a guest's name to create a personal wedding or reception invitation link.
          </p>
        </div>

        <form className="mt-8" onSubmit={handleGenerate}>
          <label
            htmlFor="guest-name"
            className="mb-2 block font-display text-sm font-semibold tracking-wide text-burgundy"
          >
            Guest name
          </label>
          <input
            id="guest-name"
            name="guestName"
            type="text"
            autoComplete="name"
            value={guestNameInput}
            onChange={(event) => setGuestNameInput(event.target.value)}
            placeholder="e.g. Ram Sharma"
            className="w-full rounded-xl border border-burgundy/25 bg-white/80 px-4 py-3 font-body text-base text-ink placeholder:text-brown/50 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-rose/20"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-burgundy px-5 py-3 font-display text-sm font-semibold tracking-wide text-ivory-soft shadow-soft transition-colors hover:bg-burgundy-deep"
          >
            Create Wedding Invitation Link
          </button>
          <button
            type="button"
            onClick={() => generateInvitationLink('reception')}
            className="mt-3 w-full rounded-xl border border-burgundy/30 bg-white/70 px-5 py-3 font-display text-sm font-semibold tracking-wide text-burgundy transition-colors hover:bg-white"
          >
            Create Reception Invitation Link
          </button>
        </form>

        {generatedName && generatedUrl ? (
          <div className="mt-8 border-t border-gold/25 pt-6">
            <p className="font-display text-sm text-brown">
              {generatedInvitationType === 'reception'
                ? 'Reception invitation for'
                : 'Wedding invitation for'}
            </p>
            <p className="mt-1 break-words font-display text-xl text-burgundy">
              {generatedName}
            </p>
            <label
              htmlFor="generated-link"
              className="mb-2 mt-5 block font-display text-sm font-semibold tracking-wide text-burgundy"
            >
              Invitation link
            </label>
            <input
              id="generated-link"
              type="url"
              readOnly
              value={generatedUrl}
              onFocus={(event) => event.currentTarget.select()}
              className="w-full rounded-xl border border-burgundy/20 bg-white/75 px-4 py-3 font-body text-sm text-ink"
            />
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => void copyInvitationLink()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-burgundy/30 bg-white/70 px-4 py-3 font-display text-sm font-semibold text-burgundy transition-colors hover:bg-white"
              >
                <Copy size={17} aria-hidden="true" />
                Copy Link
              </button>
              <button
                type="button"
                onClick={() => void handleWhatsAppShare()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#456b45] px-4 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#365536]"
              >
                Share via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => void handleMessengerShare()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0084ff] px-4 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#006edb]"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Share via Messenger
              </button>
              <button
                type="button"
                onClick={() => void handleShare()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-rose/35 bg-blush/20 px-4 py-3 font-display text-sm font-semibold text-burgundy transition-colors hover:bg-blush/35"
              >
                <Share2 size={17} aria-hidden="true" />
                Share
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brown/20 px-4 py-3 font-display text-sm text-brown transition-colors hover:bg-white/60"
              >
                <RotateCcw size={16} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        ) : null}

        {feedback ? (
          <p
            role="status"
            className={`mt-4 text-center font-body text-sm ${
              feedback.tone === 'error' ? 'text-rose' : 'text-leaf-deep'
            }`}
          >
            {feedback.message}
          </p>
        ) : null}
      </section>
    </main>
  )
}
