import { Map, MapPin, Navigation } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { PaperPattern } from './decorations/PaperPattern'
import { GoldLink } from './ui/GoldButton'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function VenueSection() {
  const weddingConfig = useWeddingConfig()
  const { venue } = weddingConfig

  return (
    <section
      id="venue"
      className="relative overflow-hidden border-y border-burgundy/15 bg-apricot py-16 sm:py-24"
      aria-labelledby="venue-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.1} />
      <FloralCorner corner="top-right" className="hidden w-[clamp(120px,18vw,240px)] sm:block" opacity={0.5} />
      <FloralCorner corner="bottom-left" className="w-[clamp(120px,18vw,240px)]" opacity={0.45} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          headingId="venue-heading"
          nepali="स्थल"
          title="The Venue"
          subtitle="We look forward to welcoming you in Dhulikhel"
        />

        <Reveal delay={0.12} className="mt-8">
          <div className="relative border border-burgundy/40 bg-cream/95 shadow-card">
            <div className="pointer-events-none absolute inset-2 border border-blush/50" />

            <div className="relative grid md:grid-cols-[1fr_auto]">
              <div className="p-5 sm:p-8">
                <p className="eyebrow text-brown/70">Celebrate with us at</p>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.2rem)] leading-tight tracking-[0.03em] text-burgundy">
                  {venue.name}
                </h3>
                <p
                  lang="ne"
                  className="mt-1.5 font-devanagari text-lg text-leaf-deep"
                >
                  {venue.nepaliName}
                </p>

                <address className="mt-3 max-w-md not-italic font-body text-lg leading-relaxed text-brown/85">
                  {venue.address}
                </address>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <GoldLink
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="dark"
                  >
                    <Navigation
                      className="h-4 w-4"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    Get directions
                  </GoldLink>
                  <GoldLink
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="quiet"
                  >
                    <Map
                      className="h-4 w-4"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    View on Google Maps
                  </GoldLink>
                </div>
              </div>

              <div className="relative flex items-center justify-center border-t border-burgundy/20 p-5 md:w-56 md:border-l md:border-t-0">
                <div
                  className="relative grid h-28 w-28 place-items-center rounded-full border border-burgundy/40"
                  aria-hidden="true"
                >
                  <div className="absolute inset-3 rounded-full border border-blush/50" />
                  <div className="absolute inset-5 rounded-full border border-dashed border-leaf/35" />
                  <MapPin
                    className="h-9 w-9 text-burgundy"
                    strokeWidth={1.2}
                  />
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-burgundy/70" />
                  <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-leaf/70" />
                  <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-leaf/70" />
                  <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-leaf/70" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-3 text-center font-body text-sm italic text-brown/60">
          Directions will open in Google Maps.
        </p>
      </div>
    </section>
  )
}