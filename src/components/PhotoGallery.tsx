import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { GalleryPhoto } from '../config/wedding'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { Mandala } from './decorations/Mandala'
import { Monogram } from './decorations/Monogram'
import { PaperPattern } from './decorations/PaperPattern'
import { Modal } from './ui/Modal'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

interface PhotoTileProps {
  photo: GalleryPhoto
  index: number
  onOpen: (index: number) => void
}

function PhotoTile({ photo, index, onOpen }: PhotoTileProps) {
  const [failed, setFailed] = useState(false)
  const weddingConfig = useWeddingConfig()
  const { groom, bride } = weddingConfig.couple
  const label = photo.caption ?? photo.alt
  const contain = photo.fit === 'contain'

  return (
    <Reveal delay={index * 0.05}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View photo: ${label}`}
        className="group relative block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
      >
        <div className="relative border border-burgundy/40 bg-cream p-1.5 shadow-card transition-colors duration-500 group-hover:border-burgundy">
          <div
            className={`relative overflow-hidden border border-blush/60 ${contain ? 'bg-cream' : ''}`}
          >
            {failed ? (
              <div className="grid aspect-[4/5] w-full place-items-center bg-burgundy-deep">
                <Monogram
                  groomName={groom.name}
                  brideName={bride.name}
                  className="w-2/3 opacity-90"
                />
              </div>
            ) : (
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
                className={`aspect-[4/5] w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${contain ? 'object-contain' : 'object-cover'}`}
              />
            )}

            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,244,230,0)_38%,rgba(255,235,216,0.94)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />

            <span
              className="pointer-events-none absolute inset-2 border border-cream/30"
              aria-hidden="true"
            />

            <span className="absolute left-3 top-3 h-1.5 w-1.5 rotate-45 border border-blush/80 bg-burgundy/70" aria-hidden="true" />
            <span className="absolute right-3 top-3 h-1.5 w-1.5 rotate-45 border border-blush/80 bg-burgundy/70" aria-hidden="true" />
            <span className="absolute bottom-3 left-3 h-1.5 w-1.5 rotate-45 border border-blush/80 bg-burgundy/70" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 h-1.5 w-1.5 rotate-45 border border-blush/80 bg-burgundy/70" aria-hidden="true" />

            <span className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 pt-8 text-center">
              <span className="font-body text-lg italic leading-snug text-burgundy">
                {label}
              </span>
              <span className="mt-1 font-display text-[0.5rem] uppercase tracking-[0.26em] text-rose/80">
                View photo
              </span>
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

export function PhotoGallery() {
  const weddingConfig = useWeddingConfig()
  const photos = weddingConfig.photos?.gallery ?? []
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [lightboxFailed, setLightboxFailed] = useState(false)
  const reduceMotion = useReducedMotion()
  const { groom, bride } = weddingConfig.couple

  const openPhoto = useCallback((index: number) => {
    setLightboxFailed(false)
    setActiveIndex(index)
  }, [])

  const closePhoto = useCallback(() => setActiveIndex(null), [])

  const step = useCallback(
    (direction: number) => {
      if (photos.length === 0) return
      setLightboxFailed(false)
      setActiveIndex((current) => {
        if (current === null) return current
        return (current + direction + photos.length) % photos.length
      })
    },
    [photos.length],
  )

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, step])

  if (photos.length === 0) return null

  const activePhoto =
    activeIndex !== null ? photos[activeIndex] ?? null : null
  const activeLabel = activePhoto?.caption ?? activePhoto?.alt ?? ''

  return (
    <section
      id="photos"
      className="relative overflow-hidden border-y border-burgundy/15 bg-cream py-16 sm:py-24"
      aria-labelledby="photos-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.1} />
      <Mandala
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(150vw,900px)] -translate-x-1/2 -translate-y-1/2 text-leaf opacity-[0.08]"
        speed={260}
      />
      <FloralCorner
        corner="top-left"
        className="w-[clamp(110px,16vw,210px)]"
        opacity={0.45}
      />
      <FloralCorner
        corner="bottom-right"
        className="hidden w-[clamp(110px,16vw,210px)] sm:block"
        opacity={0.4}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle
          headingId="photos-heading"
          nepali="हाम्रा क्षणहरू"
          title="Our Photos"
          subtitle="A few special moments from our journey together."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <PhotoTile
              key={`${photo.src}-${index}`}
              photo={photo}
              index={index}
              onOpen={openPhoto}
            />
          ))}
        </div>

        <p className="mt-4 text-center font-body text-sm italic text-burgundy/55">
          Tap any photograph to view it larger.
        </p>
      </div>

      <Modal
        open={activePhoto !== null}
        onClose={closePhoto}
        titleId="gallery-lightbox-title"
        className="max-w-[820px]"
      >
        <div className="relative bg-burgundy-deep px-4 pb-4 pt-12 sm:px-6">
          <h2 id="gallery-lightbox-title" className="sr-only">
            {weddingConfig.invitationType === 'reception'
              ? 'Reception photo viewer'
              : 'Wedding photo viewer'}
          </h2>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-center justify-center"
            >
              {activePhoto && !lightboxFailed ? (
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  onError={() => setLightboxFailed(true)}
                  className="mx-auto max-h-[68svh] w-auto max-w-full object-contain"
                />
              ) : (
                <div className="grid aspect-[4/5] w-full max-w-sm place-items-center bg-burgundy-deep">
                  <Monogram
                    groomName={groom.name}
                    brideName={bride.name}
                    className="w-2/3"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-cream/40 bg-burgundy/80 text-cream transition-colors hover:border-cream hover:bg-burgundy sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-cream/40 bg-burgundy/80 text-cream transition-colors hover:border-cream hover:bg-burgundy sm:right-4"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-1 px-6 py-5 text-center">
          <p className="font-body text-xl italic text-burgundy">
            {activeLabel}
          </p>
          <p className="font-display text-[0.58rem] uppercase tracking-[0.24em] text-leaf-deep">
            {activeIndex !== null ? activeIndex + 1 : 0} / {photos.length}
          </p>
        </div>
      </Modal>
    </section>
  )
}
