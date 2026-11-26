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

function InvitationExperience({ guestName }: { guestName: string | null }) {
  const [opened, setOpened] = useState(false)
  const toast = useState<ToastMessage | null>(null)[0]
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    applyWeddingSeo(weddingConfig)
  }, [])

  useEffect(() => {
    if (!opened) {
      window.scrollTo({ top: 0, behavior: 'auto' })
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
    window.scrollTo({ top: 0, behavior: 'auto' })
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
