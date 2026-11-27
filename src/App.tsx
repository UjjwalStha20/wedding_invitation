import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EnvelopeOpening } from './components/EnvelopeOpening'
import { InvitationLinkGeneratorPage } from './components/InvitationLinkGeneratorPage'
import { InvitationPage } from './components/InvitationPage'
import { HomePage } from './components/HomePage'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { Toast, type ToastMessage } from './components/ui/Toast'
import { receptionConfig } from './config/reception'
import { weddingConfig } from './config/wedding'
import { WeddingConfigProvider } from './hooks/useWeddingConfig'
import { useGuestName } from './hooks/useGuestName'
import { applyWeddingSeo } from './utils/seo'

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

interface InvitationExperienceProps {
  guestName: string | null
  canonicalPath: string
  config: typeof weddingConfig
}

function InvitationExperience({
  guestName,
  canonicalPath,
  config,
}: InvitationExperienceProps) {
  const [opened, setOpened] = useState(false)
  const toast = useState<ToastMessage | null>(null)[0]
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    applyWeddingSeo(config, canonicalPath)
  }, [canonicalPath, config])

  useEffect(() => {
    if (!opened) {
      window.scrollTo(0, 0)
    }
  }, [opened])

  useEffect(() => {
    if (opened) return

    const root = document.documentElement
    const body = document.body
    const rootOverflow = root.style.overflow
    const bodyOverflow = body.style.overflow

    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      root.style.overflow = rootOverflow
      body.style.overflow = bodyOverflow
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

  const handleOpen = useCallback(() => {
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
          {!opened ? (
            <EnvelopeOpening onOpen={handleOpen} guestName={guestName} />
          ) : null}
        </AnimatePresence>
        <Toast toast={toast} />
      </LayoutGroup>
    </ErrorBoundary>
  )
}

interface InvitationRouteProps {
  canonicalPath: string
  config: typeof weddingConfig
}

function InvitationRoute({ canonicalPath, config }: InvitationRouteProps) {
  return (
    <WeddingConfigProvider config={config}>
      <InvitationExperience
        guestName={useGuestName()}
        canonicalPath={canonicalPath}
        config={config}
      />
    </WeddingConfigProvider>
  )
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  if (pathname === '/generate') return <InvitationLinkGeneratorPage />
  if (pathname === '') return <HomePage />

  const isReception = pathname === '/reception'
  return (
    <InvitationRoute
      canonicalPath={isReception ? '/reception' : '/janti'}
      config={isReception ? receptionConfig : weddingConfig}
    />
  )
}

export default App
