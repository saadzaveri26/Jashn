interface RangoliRingProps {
  className?: string;
  size?: number;
}

export function RangoliRing({
  className = "",
  size = 120,
}: RangoliRingProps) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="50" cy="50" r="46" stroke="var(--gold, #b48310)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="38" stroke="var(--marigold, #d97706)" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="26" stroke="var(--vermilion, #b91c1c)" strokeWidth="1" />
      <circle cx="50" cy="50" r="10" fill="var(--gold, #b48310)" opacity="0.4" />
      <circle cx="50" cy="50" r="4" fill="var(--vermilion, #b91c1c)" />

      {petals.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 12 C 55 24, 55 34, 50 38 C 45 34, 45 24, 50 12 Z"
            fill="var(--marigold, #d97706)"
            opacity="0.75"
          />
          <circle cx="50" cy="12" r="2.5" fill="var(--gold, #b48310)" />
          <circle cx="50" cy="24" r="1.5" fill="#ffffff" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

