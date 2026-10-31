interface MarigoldGarlandProps {
  className?: string;
  count?: number;
  vertical?: boolean;
}

export function MarigoldGarland({
  className = "",
  count = 8,
  vertical = false,
}: MarigoldGarlandProps) {
  const blooms = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-center justify-between select-none ${
        vertical ? "flex-col py-1" : "flex-row px-1"
      } ${className}`}
    >
      {blooms.map((idx) => {
        const isGold = idx % 2 === 0;
        return (
          <svg
            key={idx}
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill={isGold ? "var(--marigold, #d97706)" : "var(--vermilion, #b91c1c)"}
              opacity="0.85"
            />
            <circle
              cx="12"
              cy="12"
              r="7"
              fill={isGold ? "var(--gold, #b48310)" : "var(--marigold, #d97706)"}
              opacity="0.9"
            />
            <circle
              cx="12"
              cy="12"
              r="3.5"
              fill="var(--gold, #f5b738)"
            />
            <circle cx="7" cy="8" r="1.5" fill="#ffffff" opacity="0.4" />
            <circle cx="17" cy="8" r="1.5" fill="#ffffff" opacity="0.4" />
            <circle cx="7" cy="16" r="1.5" fill="#ffffff" opacity="0.4" />
            <circle cx="17" cy="16" r="1.5" fill="#ffffff" opacity="0.4" />
          </svg>
        );
      })}
    </div>
  );
}

