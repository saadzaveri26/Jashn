interface JaaliLatticeProps {
  className?: string;
  horizontal?: boolean;
}

export function JaaliLattice({
  className = "",
  horizontal = true,
}: JaaliLatticeProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden select-none opacity-35 dark:opacity-25 ${
        horizontal ? "w-full h-4" : "h-full w-4"
      } ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="jaali-pattern"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M12 0 L24 12 L12 24 L0 12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M12 4 L12 20 M4 12 L20 12" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali-pattern)" />
      </svg>
    </div>
  );
}

