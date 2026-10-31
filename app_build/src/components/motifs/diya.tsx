interface DiyaProps {
  lit?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { w: 20, h: 20 },
  md: { w: 32, h: 32 },
  lg: { w: 48, h: 48 },
};

export function Diya({
  lit = true,
  size = "md",
  className = "",
}: DiyaProps) {
  const { w, h } = sizeMap[size] || sizeMap.md;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M6 24 C 6 34, 34 34, 34 24 C 34 22, 31 21, 26 21 C 20 21, 14 21, 6 24 Z"
        fill="var(--gold, #b48310)"
        stroke="var(--marigold, #d97706)"
        strokeWidth="1.5"
      />
      <ellipse cx="20" cy="22" rx="11" ry="3" fill="var(--vermilion, #b91c1c)" opacity="0.6" />
      <path d="M14 31 L26 31" stroke="var(--gold, #b48310)" strokeWidth="2" strokeLinecap="round" />

      {lit && (
        <g className="diya-flame origin-bottom">
          <path
            d="M20 7 C 23 12, 25 16, 20 20 C 15 16, 17 12, 20 7 Z"
            fill="var(--marigold, #f59e0b)"
            opacity="0.95"
          />
          <path
            d="M20 11 C 21.5 14, 22.5 16, 20 19 C 17.5 16, 18.5 14, 20 11 Z"
            fill="#fffbeb"
          />
        </g>
      )}
    </svg>
  );
}

