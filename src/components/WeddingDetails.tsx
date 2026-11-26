import { BusFront, Clock3, MapPin } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function WeddingDetails() {
  const { date } = useWeddingConfig()

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-peach py-16 sm:py-24"
      aria-labelledby="details-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.11} />
      <FloralCorner
        corner="top-left"
        className="w-[clamp(100px,15vw,210px)] animate-gentle-bob"
        opacity={0.38}
      />
      <FloralCorner
        corner="bottom-right"
        className="w-[clamp(100px,15vw,210px)] animate-gentle-bob"
        opacity={0.36}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle
          headingId="details-heading"
          nepali="शुभ दिन"
          title="Wedding Day"
          subtitle="Join us to celebrate our wedding."
        />

        <Reveal delay={0.12} className="mt-8">
          <div className="relative mx-auto max-w-2xl border border-burgundy/45 bg-cream/90 p-1.5 shadow-card">
            <div className="pointer-events-none absolute inset-2 border border-blush/60" />
            <span className="absolute left-3 top-3 h-2 w-2 rotate-45 border border-burgundy/50 bg-cream" />
            <span className="absolute right-3 top-3 h-2 w-2 rotate-45 border border-burgundy/50 bg-cream" />
            <span className="absolute bottom-3 left-3 h-2 w-2 rotate-45 border border-burgundy/50 bg-cream" />
            <span className="absolute bottom-3 right-3 h-2 w-2 rotate-45 border border-burgundy/50 bg-cream" />

            <div className="relative px-4 py-7 text-center sm:px-8 sm:py-9">
              <p className="eyebrow text-brown/70">BIKRAM SAMBAT</p>
              <p className="mt-2 font-display text-[clamp(1.9rem,6vw,3rem)] leading-tight tracking-[0.035em] text-burgundy">
                {date.bs}
              </p>
              <p
                lang="ne"
                className="mt-1 font-devanagari text-lg text-leaf-deep sm:text-xl"
              >
                {date.bsNepali}
              </p>
              <FloralDivider className="mt-3" />
              <time
                dateTime={date.isoDate}
                className="mt-2 block font-body text-lg italic text-brown/85 sm:text-xl"
              >
                {date.gregorian}
              </time>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-brown/65">Together, in celebration</p>
            <h3 className="mt-1 font-display text-[clamp(1.7rem,4vw,2.4rem)] text-burgundy">
              The Janti Journey
            </h3>
            <FloralDivider className="mt-2" />
            <p
              lang="ne"
              className="mx-auto mt-4 max-w-3xl font-devanagari text-base leading-[1.95] text-brown sm:text-lg"
            >
              हाम्रो यस शुभ विवाहको अवसरमा जन्ती प्रस्थानका लागि बिहान ७:०० बजे
              बाल्खु, काठमाडौंमा भेला भई हेटौंडातर्फ प्रस्थान गरिने हुँदा यहाँहरूको
              गरिमामय उपस्थितिका लागि हार्दिक अनुरोध गर्दछौँ।
            </p>
          </div>

          <ol
            aria-label="Janti route from Balkhu to the wedding venue"
            className="relative mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-6 before:absolute before:bottom-8 before:left-[1.45rem] before:top-8 before:border-l before:border-dashed before:border-burgundy/35 md:grid-cols-[1fr_0.8fr_1fr] md:items-start md:gap-0 md:before:left-[16%] md:before:right-[16%] md:before:top-8 md:before:bottom-auto md:before:border-l-0 md:before:border-t"
          >
            <li className="group relative z-10 flex items-center gap-4 text-left transition-transform duration-300 hover:-translate-y-1 md:flex-col md:gap-3 md:text-center">
              <a
                href="https://maps.app.goo.gl/R47wHNB7HfFymFsV8"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Balkhu, Kathmandu in Google Maps"
                className="flex items-center gap-4 no-underline md:flex-col md:gap-3"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-burgundy/35 bg-cream text-burgundy shadow-soft transition-colors duration-300 group-hover:bg-ivory-soft md:h-16 md:w-16">
                  <MapPin className="h-7 w-7 md:h-6 md:w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0 md:max-w-[15rem]">
                  <p className="eyebrow text-[0.6rem] text-leaf-deep">Janti Gathering</p>
                  <h4 className="mt-1 font-display text-xl text-burgundy">Balkhu</h4>
                  <p className="font-body text-sm text-brown/80">Balkhu, Kathmandu</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 font-display text-sm text-brown">
                    <Clock3 className="h-3.5 w-3.5 text-burgundy" aria-hidden="true" />
                    7:00 AM
                  </p>
                </div>
              </a>
            </li>

            <li className="group relative z-10 flex items-center gap-4 text-left transition-transform duration-300 hover:-translate-y-1 md:flex-col md:gap-3 md:text-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/45 bg-ivory-soft text-burgundy shadow-soft md:h-16 md:w-16">
                <BusFront
                  className="h-6 w-6 animate-gentle-bob md:h-7 md:w-7"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="eyebrow text-[0.6rem] text-brown/65">On our way</p>
                <p className="mt-1 font-display text-lg text-burgundy">Janti Departure</p>
                <p className="font-body text-sm italic text-brown/75">Balkhu → Hetauda</p>
              </div>
            </li>

            <li className="group relative z-10 flex items-center gap-4 text-left transition-transform duration-300 hover:-translate-y-1 md:flex-col md:gap-3 md:text-center">
              <a
                href="https://google.com/maps/place/himalayan+durbar+hetauda/data=!4m2!3m1!1s0x39eb490051e041b3:0xe3a7e8e47d0e6789?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Himalayan Durbar Banquet, Hetauda in Google Maps"
                className="flex items-center gap-4 no-underline md:flex-col md:gap-3"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-burgundy/35 bg-cream text-burgundy shadow-soft transition-colors duration-300 group-hover:bg-ivory-soft md:h-16 md:w-16">
                  <MapPin className="h-7 w-7 md:h-6 md:w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0 md:max-w-[16rem]">
                  <p className="eyebrow text-[0.6rem] text-leaf-deep">Wedding Venue</p>
                  <h4 className="mt-1 font-display text-lg leading-snug text-burgundy sm:text-xl">
                    Himalayan Durbar Banquet
                  </h4>
                  <p className="font-body text-sm text-brown/80">Hetauda</p>
                </div>
              </a>
            </li>
          </ol>
        </Reveal>

        <Reveal delay={0.25} className="mt-8 sm:mt-10">
          <FloralDivider className="mx-auto max-w-sm" />
          <p className="mt-2 text-center font-body text-lg italic text-brown/85 sm:text-xl">
            Your presence will make our happiness even more special.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
