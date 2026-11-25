import { FloatingPetals } from '../decorations/FloatingPetals'
import { PaperPattern } from '../decorations/PaperPattern'

export function LeftPanel({ className = '' }: { className?: string }) {
  return (
    <section
      className={`relative bg-ivory overflow-hidden min-h-[400px] py-8 sm:py-12 border-y border-burgundy/30 ${className}`}
      aria-label="Left side of the invitation"
    >
      <PaperPattern className="text-gold" opacity={0.15} />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <FloatingPetals className="opacity-50" />

        <div className="relative mb-8">
          <div className="absolute -top-2 -left-2">
            <svg
              className="h-12 w-12 text-maroon/60"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 h-12 w-12 rotate-180">
            <svg
              className="h-12 w-12 text-maroon/60"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z" />
            </svg>
          </div>
          <div className="mx-auto h-20 w-20 rounded-full bg-maroon/10 flex items-center justify-center mb-3">
            <svg
              className="h-10 w-10 text-maroon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z" />
            </svg>
          </div>
          <p className="font-display text-[clamp(1.5rem,4vw,2.2rem)] leading-tight tracking-[0.03em] text-maroon">
            <span className="cursive">Rakesh</span>
          </p>
          <p lang="ne" className="mt-1 font-devanagari text-lg text-maroon/70">
            राखेश
          </p>
        </div>

        <div className="relative w-24 h-24 rounded-full mx-auto mb-8 border-2 border-maroon/30 flex items-center justify-center">
          <svg
            className="h-full w-full text-maroon/70"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z" />
          </svg>
        </div>

        <p lang="ne" className="font-devanagari text-sm text-maroon/60 mb-8">
          ॐ श्री गणेशाय नमः:
        </p>
      </div>
    </section>
  )
}