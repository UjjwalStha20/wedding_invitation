interface PeacockFeatherProps {
  className?: string
  opacity?: number
}

const barbs = Array.from({ length: 17 }, (_, index) => {
  const progress = index / 16
  return {
    y: 296 - progress * 218,
    spread: 20 + Math.sin(progress * Math.PI) * 32,
    color: index % 3 === 0 ? '#7545B9' : '#718B50',
    opacity: 0.22 + (1 - progress) * 0.3,
  }
})

export function PeacockFeather({
  className = '',
  opacity = 1,
}: PeacockFeatherProps) {
  return (
    <svg
      viewBox="0 0 140 320"
      className={className}
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M70 318 C 66 244 60 168 67 92 C 69 66 73 42 78 22"
        stroke="#75513C"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />

      {barbs.map((barb, index) => (
        <g key={index}>
          <path
            d={`M68 ${barb.y} C ${68 + barb.spread * 0.42} ${
              barb.y - 7
            } ${68 + barb.spread * 0.78} ${barb.y - 12} ${
              68 + barb.spread
            } ${barb.y - 17}`}
            stroke={barb.color}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={barb.opacity}
          />
          <path
            d={`M68 ${barb.y} C ${68 - barb.spread * 0.42} ${
              barb.y - 7
            } ${68 - barb.spread * 0.78} ${barb.y - 12} ${
              68 - barb.spread
            } ${barb.y - 17}`}
            stroke={barb.color}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={barb.opacity}
          />
        </g>
      ))}

      <g>
        {Array.from({ length: 18 }, (_, index) => {
          const angle = (index / 18) * Math.PI * 2
          return (
            <path
              key={`fringe-${index}`}
              d={`M70 62 L ${70 + Math.cos(angle) * 30} ${
                62 + Math.sin(angle) * 38
              }`}
              stroke="#718B50"
              strokeWidth="0.7"
              opacity="0.35"
            />
          )
        })}
        <ellipse cx="70" cy="62" rx="24" ry="32" fill="#7545B9" opacity="0.22" />
        <ellipse cx="70" cy="62" rx="16" ry="23" fill="#718B50" opacity="0.38" />
        <ellipse cx="70" cy="62" rx="10" ry="15" fill="#4F6636" opacity="0.75" />
        <ellipse cx="70" cy="62" rx="4.5" ry="7" fill="#C6A15B" opacity="0.9" />
        <circle cx="68" cy="59" r="1.4" fill="#FFF4E6" opacity="0.75" />
      </g>
    </svg>
  )
}
