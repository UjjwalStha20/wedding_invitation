import { Sparkles } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { FloatingPetals } from './decorations/FloatingPetals'
import { GoldDivider } from './decorations/GoldDivider'
import { Mandala } from './decorations/Mandala'
import { OrnamentalFrame } from './decorations/OrnamentalFrame'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'

interface ClosingSectionProps {
  onOpenGenerator: () => void
}

export function ClosingSection({ onOpenGenerator }: ClosingSectionProps) {
  const { couple, families, messages, date } = weddingConfig
  const groomFirst = couple.groom.name.split(' ')[0]
  const brideFirst = couple.bride.name.split(' ')[0]

  return (
    <section
      id="closing"
      className="relative overflow-hidden bg-burgundy py-20 text-ivory sm:py-28"
      aria-labelledby="closing-heading"
    >
      <PaperPattern className="text-gold" opacity={0.17} />
      <Mandala
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(155vw,980px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        speed={240}
      />
      <FloatingPetals className="opacity-60" />
      <OrnamentalFrame />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p
            lang="ne"
            className="font-devanagari text-base tracking-[0.08em] text-gold-light"
          >
            आभार
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-[clamp(1.4rem,3.6vw,2rem)] italic leading-relaxed text-ivory/85">
            {messages.closing}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <p className="font-body text-lg italic text-ivory/55">
            {messages.closingSalutation}
          </p>
        </Reveal>

        <div className="mx-auto mt-7 grid max-w-2xl gap-8 sm:grid-cols-2 sm:gap-12">
          {families.map((family) => (
            <div key={family.side}>
              <h3 className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {family.side}
              </h3>
              <p
                lang="ne"
                className="mt-1 font-devanagari text-sm text-gold/60"
              >
                {family.sideNepali}
              </p>
              <ul className="mt-3 space-y-1 font-body text-lg text-ivory/75">
                {family.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-10">
          <GoldDivider />
        </Reveal>

        <Reveal delay={0.22}>
          <h2
            id="closing-heading"
            lang="ne"
            className="mt-8 font-devanagari text-[clamp(2rem,6vw,3.2rem)] leading-[1.4] text-gold-light"
          >
            ॥ शुभ विवाह ॥
          </h2>
          <p className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.28em] text-ivory/55">
            {groomFirst} & {brideFirst} · {date.bs}
          </p>
        </Reveal>

        <Reveal delay={0.28} className="mt-10">
          <button
            type="button"
            onClick={onOpenGenerator}
            className="group inline-flex min-h-11 items-center gap-2 border-b border-gold/40 pb-1 font-display text-[0.62rem] uppercase tracking-[0.2em] text-gold/80 transition-colors hover:border-gold hover:text-gold-light"
          >
            <Sparkles
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12"
              aria-hidden="true"
            />
            Create a personalised invitation
          </button>
        </Reveal>

        <footer className="safe-bottom mt-12 border-t border-gold/15 pt-6 text-center">
          <p className="font-body text-sm italic text-ivory/40">
            {couple.groom.name} & {couple.bride.name} · Kathmandu, Nepal
          </p>
          <p className="mt-1 font-display text-[0.52rem] uppercase tracking-[0.24em] text-ivory/30">
            With love and blessings
          </p>
        </footer>
      </div>
    </section>
  )
}