import { useState, type FormEvent } from 'react'
import { ArrowLeft, Copy, RotateCcw, Share2 } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { normalizeGuestName, buildWhatsAppMessage } from '../utils/invitation'
import { FloralCorner } from './decorations/FloralCorner'

type Feedback = {
  message: string
  tone: 'success' | 'error'
}

export function InvitationLinkGeneratorPage() {
  const [guestNameInput, setGuestNameInput] = useState('')
  const [generatedName, setGeneratedName] = useState<string | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const invitationMessage = generatedName && generatedUrl
    ? buildWhatsAppMessage(
        generatedName,
        generatedUrl,
        weddingConfig.messages.whatsappTemplate,
        weddingConfig.messages.genericGuestName,
      )
    : ''

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = normalizeGuestName(guestNameInput)

    if (!name) {
      setFeedback({ message: 'Please enter a guest name.', tone: 'error' })
      return
    }

    setGeneratedName(name)
    setGeneratedUrl(
      `${window.location.origin}/?name=${encodeURIComponent(name)}`,
    )
    setFeedback(null)
  }

  function handleReset() {
    setGuestNameInput('')
    setGeneratedName(null)
    setGeneratedUrl(null)
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

  async function handleShare() {
    if (!generatedUrl) return

    if (!navigator.share) {
      await copyInvitationLink('Sharing is unavailable. Link copied.')
      return
    }

    try {
      await navigator.share({
        title: weddingConfig.seo.title,
        text: `${generatedName}, ${weddingConfig.messages.guestInvitation}`,
        url: generatedUrl,
      })
      setFeedback({ message: 'Invitation shared.', tone: 'success' })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      await copyInvitationLink(
        'Could not share. Link copied instead.',
      )
    }
  }

  const whatsappUrl = generatedUrl
    ? `https://wa.me/?text=${encodeURIComponent(invitationMessage)}`
    : undefined

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
          href="/"
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
            Enter a guest's name to create a personal invitation link.
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
            Create Invitation Link
          </button>
        </form>

        {generatedName && generatedUrl ? (
          <div className="mt-8 border-t border-gold/25 pt-6">
            <p className="font-display text-sm text-brown">Invitation for</p>
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
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#456b45] px-4 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-[#365536]"
              >
                Share via WhatsApp
              </a>
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
