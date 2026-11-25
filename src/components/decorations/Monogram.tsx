interface MonogramProps {
  groomName: string
  brideName: string
  className?: string
}

function firstInitial(name: string) {
  return Array.from(name.trim())[0]?.toUpperCase() ?? ''
}

export function Monogram({
  groomName,
  brideName,
  className = '',
}: MonogramProps) {
  return (
    <div
      className={`relative grid aspect-square place-items-center rounded-full border border-burgundy/40 bg-cream text-burgundy shadow-soft ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-1.5 rounded-full border border-burgundy/55" />
      <div className="absolute inset-3.5 rounded-full border border-burgundy/30" />
      <div className="absolute inset-5 rounded-full border border-leaf/25" />

      <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-burgundy/70" />
      <span className="absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-burgundy/70" />
      <span className="absolute left-2 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-leaf" />
      <span className="absolute right-2 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-leaf" />

      <div className="flex items-baseline gap-2.5 font-display">
        <span className="text-[clamp(2rem,9vw,3.6rem)] leading-none">
          {firstInitial(groomName)}
        </span>
        <span className="font-body text-[clamp(1.5rem,5vw,2.4rem)] italic leading-none text-rose">
          &
        </span>
        <span className="text-[clamp(2rem,9vw,3.6rem)] leading-none">
          {firstInitial(brideName)}
        </span>
      </div>

      <span className="absolute bottom-[18%] font-devanagari text-[0.6rem] tracking-[0.18em] text-leaf-deep">
        शुभ विवाह
      </span>

      <svg
        viewBox="0 0 48 20"
        className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 text-burgundy"
        fill="none"
      >
        <path
          d="M24 2c4 4 4 7 0 11-4-4-4-7 0-11Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M24 13c5-4 9-4 13 0-5 3-9 3-13 0ZM24 13c-5-4-9-4-13 0 5 3 9 3 13 0Z"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="24" cy="16.5" r="1" fill="currentColor" />
      </svg>
    </div>
  )
}