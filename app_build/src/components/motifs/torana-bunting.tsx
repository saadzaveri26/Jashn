interface ToranaBuntingProps {
  className?: string;
}

export function ToranaBunting({ className = "" }: ToranaBuntingProps) {
  return (
    <svg
      viewBox="0 0 1200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`w-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 10 Q 150 45, 300 10 Q 450 45, 600 10 Q 750 45, 900 10 Q 1050 45, 1200 10"
        stroke="var(--gold, #b48310)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M0 16 Q 150 51, 300 16 Q 450 51, 600 16 Q 750 51, 900 16 Q 1050 51, 1200 16"
        stroke="var(--marigold, #d97706)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      {[150, 450, 750, 1050].map((cx, i) => (
        <g key={cx} className="torana-flag origin-top">
          <path
            d={`M${cx - 24} ${26 + (i % 2) * 2} Q${cx} ${72} ${cx + 24} ${26 + (i % 2) * 2} Z`}
            fill="var(--marigold, #d97706)"
            opacity="0.9"
          />
          <path
            d={`M${cx - 16} ${26 + (i % 2) * 2} Q${cx} ${60} ${cx + 16} ${26 + (i % 2) * 2} Z`}
            fill="var(--vermilion, #b91c1c)"
            opacity="0.85"
          />
          <circle cx={cx} cy={28} r={5} fill="var(--gold, #b48310)" />
          <circle cx={cx} cy={66} r={3.5} fill="var(--gold, #b48310)" />
        </g>
      ))}
      {[0, 300, 600, 900, 1200].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={10} r={6} fill="var(--vermilion, #b91c1c)" />
          <circle cx={cx} cy={10} r={3} fill="var(--gold, #b48310)" />
          <path
            d={`M${cx - 12} 16 C${cx - 16} 34, ${cx} 44, ${cx} 44 C${cx} 44, ${cx + 16} 34, ${cx + 12} 16 Z`}
            fill="var(--leaf, #15803d)"
            opacity="0.8"
          />
        </g>
      ))}
    </svg>
  );
}

