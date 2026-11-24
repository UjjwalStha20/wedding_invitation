interface OrnamentalFrameProps {
  className?: string
}

function Corner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-10 w-10 text-gold sm:h-14 sm:w-14 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 62V22C2 10.4 10.4 2 22 2h40"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.8"
      />
      <path
        d="M9 62V25C9 15.6 15.6 9 25 9h37"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.45"
      />
      <path
        d="M22 2c5.5 7 5.5 14.5 0 22-5.5-7.5-5.5-15 0-22Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M2 22c7 5.5 14.5 5.5 22 0-7.5-5.5-15-5.5-22 0Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <circle cx="22" cy="22" r="1.7" fill="currentColor" opacity="0.8" />
      <circle cx="35" cy="9" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="9" cy="35" r="0.9" fill="currentColor" opacity="0.55" />
      <path
        d="M22 15.5v8M18 19.5h8"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.55"
      />
    </svg>
  )
}

export function OrnamentalFrame({ className = '' }: OrnamentalFrameProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-2.5 sm:inset-4 lg:inset-6 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 border border-gold/45" />
      <div className="absolute inset-1.5 border border-gold/20" />
      <Corner className="absolute -left-[1px] -top-[1px]" />
      <Corner className="absolute -right-[1px] -top-[1px] rotate-90" />
      <Corner className="absolute -bottom-[1px] -right-[1px] rotate-180" />
      <Corner className="absolute -bottom-[1px] -left-[1px] -rotate-90" />
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/60 bg-inherit" />
      <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border border-gold/60 bg-inherit" />
    </div>
  )
}