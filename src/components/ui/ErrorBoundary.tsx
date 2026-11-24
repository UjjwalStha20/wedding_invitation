import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Invitation render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-[100svh] place-items-center bg-maroon px-6 text-center text-ivory">
          <div className="max-w-md border border-gold/50 p-8">
            <p
              lang="ne"
              className="font-devanagari text-2xl text-gold-light"
            >
              ॥ शुभ विवाह ॥
            </p>
            <h1 className="mt-4 font-display text-2xl">A small pause</h1>
            <p className="mt-3 text-lg text-ivory/75">
              We could not open the invitation just now. Please refresh the
              page, or open the link again from your message.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 min-h-11 border border-gold bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-burgundy"
            >
              Refresh invitation
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
