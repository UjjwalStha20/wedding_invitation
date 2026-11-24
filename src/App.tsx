import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EnvelopeOpening } from './components/EnvelopeOpening'
import { InvitationGenerator } from './components/InvitationGenerator'
import { InvitationPage } from './components/InvitationPage'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Toast, type ToastMessage } from './components/ui/Toast'
import { weddingConfig } from './config/wedding'
import { useGuestName } from './hooks/useGuestName'
import { applyWeddingSeo } from './utils/seo'

function App() {
  const guestName = useGuestName()
  const [opened, setOpened] = useState(false)
  const [generatorOpen, setGeneratorOpen] = useState(false)
  const toast = useState<ToastMessage | null>(null)[0]
  const mainRef = useRef<HTMLElement>(null)
  const toastTimerRef = useRef<number | null>(null)

  useEffect(() => {
    applyWeddingSeo(weddingConfig)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (opened) return

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [opened])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

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

  const openGenerator = useCallback(() => setGeneratorOpen(true), [])
  const closeGenerator = useCallback(() => setGeneratorOpen(false), [])

  return (
    <ErrorBoundary>
      <LayoutGroup id="invitation">
        <InvitationPage
          guestName={guestName}
          opened={opened}
          mainRef={mainRef}
          onOpenGenerator={openGenerator}
        />

        <AnimatePresence>
          {!opened ? <EnvelopeOpening onOpen={handleOpen} /> : null}
        </AnimatePresence>

        <InvitationGenerator
          open={generatorOpen}
          onClose={closeGenerator}
        />

        <Toast toast={toast} />
      </LayoutGroup>
    </ErrorBoundary>
  )
}

export default App