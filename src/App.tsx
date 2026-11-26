import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EnvelopeOpening } from './components/EnvelopeOpening'
import { InvitationLinkGeneratorPage } from './components/InvitationLinkGeneratorPage'
import { InvitationPage } from './components/InvitationPage'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Toast, type ToastMessage } from './components/ui/Toast'
import { weddingConfig } from './config/wedding'
import { useGuestName } from './hooks/useGuestName'
import { applyWeddingSeo } from './utils/seo'

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function InvitationExperience({ guestName }: { guestName: string | null }) {
  const [opened, setOpened] = useState(false)
  const toast = useState<ToastMessage | null>(null)[0]
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    applyWeddingSeo(weddingConfig)
  }, [])

  useEffect(() => {
    if (!opened) {
      window.scrollTo(0, 0)
    }
  }, [opened])

  useEffect(() => {
    if (opened) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [opened])

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    if (opened) {
      main.removeAttribute('inert')
    } else {
      main.setAttribute('inert', '')
    }
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const focusTimer = window.setTimeout(() => {
      document.getElementById('invitation-title')?.focus({ preventScroll: true })
    }, 900)
    return () => window.clearTimeout(focusTimer)
  }, [opened])

  const handleOpen = useCallback(() => {
    window.scrollTo(0, 0)
    setOpened(true)
  }, [])

  return (
    <ErrorBoundary>
      <LayoutGroup id="invitation">
        <InvitationPage
          guestName={guestName}
          opened={opened}
          mainRef={mainRef}
        />
        <AnimatePresence>
          {!opened ? <EnvelopeOpening onOpen={handleOpen} /> : null}
        </AnimatePresence>
        <Toast toast={toast} />
      </LayoutGroup>
    </ErrorBoundary>
  )
}

function InvitationRoute() {
  return <InvitationExperience guestName={useGuestName()} />
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return pathname === '/generate' ? (
    <InvitationLinkGeneratorPage />
  ) : (
    <InvitationRoute />
  )
}

export default App
