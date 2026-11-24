interface TempleArchProps {
  className?: string
}

export function TempleArch({ className = '' }: TempleArchProps) {
  return (
    <svg
      viewBox="0 0 360 460"
      className={`text-gold ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 440V220C40 128 102 58 180 58s140 70 140 162v220"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <path
        d="M52 440V222C52 138 108 72 180 72s128 66 128 150v218"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <path
        d="M180 18c5 9 5 17 0 26-5-9-5-17 0-26Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="180" cy="30" r="2.2" fill="currentColor" opacity="0.8" />
      <path
        d="M162 58c5-13 12-16 18-28 6 12 13 15 18 28"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.75"
      />
      <path
        d="M40 440h280M40 412h280"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <path
        d="M64 412v28M296 412v28"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.55"
      />
      <path
        d="M84 168v20M276 168v20"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.45"
      />
      <circle cx="84" cy="194" r="2.5" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="276" cy="194" r="2.5" stroke="currentColor" strokeWidth="0.7" />
      <path
        d="M40 220c16 10 34 10 50 0M270 220c16 10 34 10 50 0"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.35"
      />
    </svg>
  )
}
