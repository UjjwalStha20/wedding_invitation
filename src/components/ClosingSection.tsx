import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { FloatingPetals } from './decorations/FloatingPetals'
import { Mandala } from './decorations/Mandala'
import { OrnamentalBorder } from './decorations/OrnamentalBorder'
import { PaperPattern } from './decorations/PaperPattern'
import { PeacockFeather } from './decorations/PeacockFeather'
import { Reveal } from './ui/Reveal'

export function ClosingSection() {
  const weddingConfig = useWeddingConfig()
  const { couple, families, messages, date } = weddingConfig
  const groomFirst = couple.groom.name.split(' ')[0]
  const brideFirst = couple.bride.name.split(' ')[0]

  return (
    <section
      id="closing"
      className="relative overflow-hidden bg-peach pb-32 pt-16 text-burgundy sm:py-24"
      aria-labelledby="closing-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.11} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,230,0.8)_0%,rgba(255,224,173,0.1)_58%,rgba(248,212,165,0.5)_100%)]" />
      <Mandala
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(155vw,980px)] -translate-x-1/2 -translate-y-1/2 text-leaf opacity-[0.07]"
        speed={260}
      />
      <FloatingPetals className="opacity-55" />
      <OrnamentalBorder tone="burgundy" inset="lg" />

      <FloralCorner
        corner="top-left"
        className="w-[clamp(120px,18vw,230px)]"
        opacity={0.4}
      />
      <FloralCorner
        corner="top-right"
        className="w-[clamp(120px,18vw,230px)]"
        opacity={0.4}
      />
      <FloralCorner
        corner="bottom-left"
        className="w-[clamp(140px,24vw,380px)]"
        opacity={0.8}
      />
      <FloralCorner
        corner="bottom-right"
        className="w-[clamp(140px,24vw,380px)]"
        opacity={0.8}
      />

      <PeacockFeather
        className="pointer-events-none absolute left-[8%] top-[22%] hidden h-auto w-14 -rotate-12 opacity-30 lg:block"
        opacity={1}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p
            lang="ne"
            className="font-devanagari text-base tracking-[0.08em] text-leaf-deep"
          >
            आभार
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[clamp(1.4rem,3.6vw,2rem)] italic leading-relaxed text-brown/90">
            {messages.closing}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
          <p className="font-script text-[clamp(1.3rem,3vw,1.7rem)] text-rose">
            {messages.closingSalutation}
          </p>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-2xl gap-6 sm:grid-cols-2 sm:gap-8">
          {families.map((family) => (
            <div key={family.side}>
              <h3 className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-burgundy">
                {family.side}
              </h3>
              <p
                lang="ne"
                className="mt-1 font-devanagari text-sm text-leaf-deep"
              >
                {family.sideNepali}
              </p>
              <ul
                lang="ne"
                className="mt-3 space-y-1 font-devanagari text-lg text-brown/85"
              >
                {family.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-7">
          <FloralDivider />
        </Reveal>

        <Reveal delay={0.22}>
          <h2
            id="closing-heading"
            lang="ne"
            className="mt-6 font-devanagari text-[clamp(2rem,6vw,3.2rem)] leading-[1.4] text-burgundy"
          >
            ॥ शुभ विवाह ॥
          </h2>
          <p className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.28em] text-brown/70">
            {groomFirst} &amp; {brideFirst} · {date.bs}
          </p>
        </Reveal>

        <footer className="safe-bottom mt-9 border-t border-burgundy/15 pt-5 text-center">
          <p className="font-body text-sm italic text-brown/60">
            {couple.groom.name} &amp; {couple.bride.name} · Dhulikhel, Nepal
          </p>
          <p className="mt-1 font-display text-[0.52rem] uppercase tracking-[0.24em] text-brown/45">
            With love and blessings
          </p>
        </footer>
      </div>
    </section>
  )
}
