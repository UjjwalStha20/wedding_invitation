import { Map, MapPin, Navigation } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { PaperPattern } from './decorations/PaperPattern'
import { GoldLink } from './ui/GoldButton'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function VenueSection() {
  const { venue } = weddingConfig

  return (
    <section
      id="venue"
      className="relative overflow-hidden border-y border-gold/25 bg-ivory-deep py-20 sm:py-28"
      aria-labelledby="venue-heading"
    >
      <PaperPattern className="text-gold" opacity={0.19} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          headingId="venue-heading"
          nepali="स्थल"
          title="The Venue"
          subtitle="We look forward to welcoming you in Kathmandu"
        />

        <Reveal delay={0.12} className="mt-10">
          <div className="relative border border-gold/60 bg-ivory shadow-card">
            <div className="pointer-events-none absolute inset-2 border border-gold/20" />

            <div className="relative grid md:grid-cols-[1fr_auto]">
              <div className="p-6 sm:p-10">
                <p className="eyebrow text-gold-deep">Celebrate with us at</p>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.2rem)] leading-tight tracking-[0.03em] text-maroon">
                  {venue.name}
                </h3>
                <p
                  lang="ne"
                  className="mt-1.5 font-devanagari text-lg text-gold-deep"
                >
                  {venue.nepaliName}
                </p>

                <address className="mt-4 max-w-md not-italic font-body text-lg leading-relaxed text-burgundy/75">
                  {venue.address}
                </address>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

              <div className="relative flex items-center justify-center border-t border-gold/25 p-6 md:w-56 md:border-l md:border-t-0">
                <div
                  className="relative grid h-28 w-28 place-items-center rounded-full border border-gold/45"
                  aria-hidden="true"
                >
                  <div className="absolute inset-3 rounded-full border border-gold/20" />
                  <div className="absolute inset-5 rounded-full border border-dashed border-gold/25" />
                  <MapPin
                    className="h-9 w-9 text-gold-deep"
                    strokeWidth={1.2}
                  />
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gold/70" />
                  <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-gold/50" />
                  <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-gold/50" />
                  <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-gold/50" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-4 text-center font-body text-sm italic text-burgundy/55">
          Directions will open in Google Maps.
        </p>
      </div>
    </section>
  )
}