interface PaisleyCornerProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
}

const rotations: Record<string, string> = {
  "top-left": "rotate-0",
  "top-right": "rotate-90",
  "bottom-right": "rotate-180",
  "bottom-left": "-rotate-90",
};

export function PaisleyCorner({
  className = "",
  position = "top-left",
  size = 48,
}: PaisleyCornerProps) {
  const rot = rotations[position] || "rotate-0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none transition-transform ${rot} ${className}`}
    >
      <path
        d="M8 8 C 24 6, 44 14, 52 28 C 60 42, 48 56, 34 54 C 20 52, 14 38, 22 28 C 28 20, 42 22, 40 32 C 38 40, 30 38, 28 32"
        stroke="var(--gold, #b48310)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="var(--marigold, #d97706)"
        fillOpacity="0.12"
      />
      <circle cx="28" cy="30" r="3" fill="var(--vermilion, #b91c1c)" opacity="0.8" />
      <circle cx="36" cy="24" r="2" fill="var(--gold, #b48310)" />
      <circle cx="44" cy="32" r="2" fill="var(--gold, #b48310)" />
      <circle cx="38" cy="42" r="2.5" fill="var(--marigold, #d97706)" />
      <path
        d="M4 4 L 20 4 M 4 4 L 4 20"
        stroke="var(--gold, #b48310)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

