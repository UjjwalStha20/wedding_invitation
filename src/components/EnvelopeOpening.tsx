import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { GaneshMotif } from './decorations/GaneshMotif'
import { OrnamentalBorder } from './decorations/OrnamentalBorder'
import { PaperPattern } from './decorations/PaperPattern'
import { InvitationCover } from './InvitationCover'

interface EnvelopeOpeningProps {
  onOpen: () => void
}

const MORPH_DELAY = 850
const OPEN_DELAY = 2100

export function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const weddingConfig = useWeddingConfig()
  const [isOpening, setIsOpening] = useState(false)
  const [morphing, setMorphing] = useState(false)
  const reduceMotion = useReducedMotion()
  const tapButtonRef = useRef<HTMLButtonElement>(null)
  const skipButtonRef = useRef<HTMLButtonElement>(null)
  const morphTimerRef = useRef<number | null>(null)
  const openTimerRef = useRef<number | null>(null)
  const onOpenRef = useRef(onOpen)

  useEffect(() => {
    onOpenRef.current = onOpen
  }, [onOpen])

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    tapButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [tapButtonRef.current, skipButtonRef.current].filter(
        (element): element is HTMLButtonElement => Boolean(element),
      )

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (!focusable.includes(active as HTMLButtonElement)) {
        event.preventDefault()
        first.focus()
        return
      }

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (morphTimerRef.current !== null) {
        window.clearTimeout(morphTimerRef.current)
      }
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current)
      }
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleOpen = useCallback(() => {
    if (isOpening) return

    if (reduceMotion) {
      onOpenRef.current()
      return
    }

    setIsOpening(true)
    morphTimerRef.current = window.setTimeout(
      () => setMorphing(true),
      MORPH_DELAY,
    )
    openTimerRef.current = window.setTimeout(
      () => onOpenRef.current(),
      OPEN_DELAY,
    )
  }, [isOpening, reduceMotion])

  const { groom, bride } = weddingConfig.couple
  const { date, hero } = weddingConfig

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="envelope-title"
      className="fixed inset-0 z-50 overflow-hidden bg-peach text-burgundy"
      initial={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
      }
    >
      <div className="absolute inset-0 z-10" aria-hidden={!isOpening}>
        <InvitationCover
          titleId="envelope-title"
          ganeshLayoutId={morphing ? 'ganesh-morph' : undefined}
          contentVisible={morphing}
          ganeshVisible={morphing}
          className="h-full"
        />
      </div>

      <motion.div
        className="absolute inset-0 z-20 [will-change:opacity]"
        aria-hidden="true"
        initial={false}
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: isOpening ? 0.15 : 0,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute inset-0 bg-apricot" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,230,0.85)_0%,rgba(248,212,165,0.4)_100%)]" />
        <PaperPattern className="text-burgundy" opacity={0.12} />
        <OrnamentalBorder tone="burgundy" inset="lg" />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[48%] overflow-hidden [will-change:transform,opacity]"
        aria-hidden="true"
        initial={false}
        animate={isOpening ? { y: '24%', opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: isOpening ? 0.05 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 16%, 50% 0, 100% 16%, 100% 100%, 0 100%)',
          }}
        >
          <div className="absolute inset-0 bg-cream" />
          <PaperPattern className="text-burgundy" opacity={0.1} />
          <FloralCorner
            corner="bottom-left"
            className="w-[clamp(88px,14vw,168px)]"
            opacity={0.55}
          />
          <FloralCorner
            corner="bottom-right"
            className="w-[clamp(88px,14vw,168px)]"
            opacity={0.55}
          />
        </div>
        <svg
          viewBox="0 0 100 48"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-burgundy/55"
          fill="none"
        >
          <path
            d="M0.4 8 50 0.6 99.6 8"
            stroke="currentColor"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M8 14 50 7 92 14"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute inset-x-0 top-[26%] flex flex-col items-center px-6 text-center">
          <p
            lang="ne"
            className="font-devanagari text-[clamp(0.95rem,3vw,1.3rem)] tracking-[0.06em] text-leaf-deep"
          >
            {hero.nepali}
          </p>
          <p className="mt-2 font-script text-[clamp(1.9rem,6vw,2.9rem)] leading-tight text-burgundy">
            {groom.name.split(' ')[0]}
            <span className="mx-2 font-body text-blush">&amp;</span>
            {bride.name.split(' ')[0]}
          </p>
          <p
            lang="ne"
            className="mt-1.5 font-devanagari text-sm text-burgundy/65"
          >
            {date.bsNepali}
          </p>
          <p className="mt-0.5 font-body text-sm italic text-brown/70">
            {date.gregorian}
          </p>
        </div>

        <p className="absolute inset-x-0 bottom-[max(1.1rem,env(safe-area-inset-bottom))] px-6 text-center font-display text-[0.56rem] uppercase tracking-[0.24em] text-burgundy/70">
          {isOpening ? 'Opening…' : 'Tap anywhere to open'}
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[58%] origin-top [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]"
        aria-hidden="true"
        initial={false}
        animate={isOpening ? { rotateX: -178 } : { rotateX: 0 }}
        transition={{
          duration: 0.75,
          delay: isOpening ? 0.05 : 0,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ transformPerspective: 1600 }}
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        >
          <div className="absolute inset-0 bg-burgundy" />
          <PaperPattern className="text-cream" opacity={0.14} />
        </div>
        <svg
          viewBox="0 0 100 58"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-blush/55"
          fill="none"
        >
          <path
            d="M0.4 1 50 56.5 99.6 1"
            stroke="currentColor"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M8 8 50 47 92 8"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute inset-x-0 top-[14%] px-6 text-center">
          <p
            lang="sa"
            className="font-devanagari text-[clamp(0.85rem,2.6vw,1.15rem)] tracking-[0.08em] text-cream/90"
          >
            {hero.sanskrit}
          </p>
          <p className="eyebrow mt-2 text-blush/80">{hero.english}</p>
        </div>
      </motion.div>

      {!morphing ? (
        <motion.div
          className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
          aria-hidden="true"
          initial={false}
          animate={isOpening ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={
            isOpening ? { duration: 0.8, ease: 'easeInOut' } : undefined
          }
        >
          <span
            className={`absolute inset-0 rounded-full border border-burgundy/35 ${reduceMotion ? '' : 'animate-seal-pulse'}`}
          />
          <div className="relative grid h-20 w-20 place-items-center rounded-full border border-blush/70 bg-burgundy shadow-[0_10px_30px_rgba(110,12,16,0.4)] sm:h-28 sm:w-28">
            <div className="absolute inset-[7%] rounded-full border border-cream/40" />
            <motion.div
              layoutId="ganesh-morph"
              className="relative aspect-[13/15] w-[58%]"
            >
              <GaneshMotif tone="cream" className="h-full w-full" />
            </motion.div>
          </div>
        </motion.div>
      ) : null}

      <button
        ref={tapButtonRef}
        type="button"
        onClick={handleOpen}
        disabled={isOpening}
        aria-label="Open wedding invitation"
        aria-busy={isOpening}
        className="absolute inset-0 z-50 cursor-pointer select-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-burgundy disabled:cursor-wait"
      />
    </motion.div>
  )
}
