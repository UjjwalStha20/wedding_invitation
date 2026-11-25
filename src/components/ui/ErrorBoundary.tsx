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
        <main className="grid min-h-[100svh] place-items-center bg-peach px-6 text-center text-burgundy">
          <div className="max-w-md border border-burgundy/40 bg-cream/90 p-8 shadow-card">
            <p
              lang="ne"
              className="font-devanagari text-2xl text-leaf-deep"
            >
              ॥ शुभ विवाह ॥
            </p>
            <h1 className="mt-4 font-display text-2xl text-burgundy">Something went wrong</h1>
            <p className="mt-3 text-lg text-brown/85">
              We could not open this invitation. Refresh the page or open the
              link from your message again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 min-h-11 border border-burgundy bg-burgundy px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-burgundy-deep"
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
