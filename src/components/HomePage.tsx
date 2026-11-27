import { useEffect } from 'react'
import { weddingConfig } from '../config/wedding'
import { applyWeddingSeo } from '../utils/seo'
import { FloralCorner } from './decorations/FloralCorner'
import { Monogram } from './decorations/Monogram'

export function HomePage() {
  useEffect(() => {
    applyWeddingSeo(weddingConfig, '/')
  }, [])

  const { groom, bride } = weddingConfig.couple

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-cream text-burgundy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(248,212,165,0.58)_0%,rgba(255,244,230,0.2)_52%,transparent_78%)]"
      />
      <FloralCorner
        corner="top-left"
        className="pointer-events-none absolute w-[clamp(150px,26vw,340px)]"
        opacity={0.75}
      />
      <FloralCorner
        corner="bottom-right"
        className="pointer-events-none absolute w-[clamp(150px,26vw,340px)]"
        opacity={0.7}
      />

      <section className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10 text-center lg:text-left">
          <p
            lang="sa"
            className="font-devanagari text-lg tracking-[0.08em] text-leaf-deep"
          >
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="eyebrow mt-4 text-brown/70">With heartfelt blessings</p>
          <h1 className="mt-4 font-script text-[clamp(3.2rem,9vw,6rem)] leading-[1.1] text-burgundy">
            {groom.name.split(' ')[0]}
            <span className="mx-3 text-rose">&amp;</span>
            {bride.name.split(' ')[0]}
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent lg:mx-0"
          />
          <p className="mx-auto mt-6 max-w-md font-body text-lg italic leading-relaxed text-brown sm:text-xl lg:mx-0">
            A joyful beginning, shared with family and friends.
          </p>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-brown/75 lg:mx-0">
            May Lord Ganesha bless Rakesh and Prumu with a lifetime of love,
            joy, and happiness.
          </p>

        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-full border border-gold/40 bg-ivory-soft/70 shadow-card">
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-full border border-burgundy/15"
          />
          <Monogram
            groomName={groom.name}
            brideName={bride.name}
            className="w-[72%]"
          />
        </div>
      </section>
    </main>
  )
}
