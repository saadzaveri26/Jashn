"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tBurst } from "@/lib/motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  r: number;
  size: number;
  color: string;
  isPetal: boolean;
}

const colors = [
  "var(--marigold, #d97706)",
  "var(--gold, #f5b738)",
  "var(--vermilion, #b91c1c)",
  "var(--rose, #9d174d)",
  "var(--peacock, #0f766e)",
];

function generateParticles(count = 32): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = 80 + Math.random() * 160;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20,
      r: Math.random() * 360,
      size: i % 2 === 0 ? 10 : 6,
      color: colors[i % colors.length],
      isPetal: i % 3 === 0,
    };
  });
}

export function CelebrationBurst({ onComplete }: { onComplete?: () => void }) {
  const shouldReduce = useReducedMotion();
  const [particles] = useState<Particle[]>(() => generateParticles(32));

  useEffect(() => {
    if (shouldReduce) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      onComplete?.();
    }, tBurst * 1000);
    return () => clearTimeout(timer);
  }, [shouldReduce, onComplete]);

  if (shouldReduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y + 40,
            scale: 1,
            opacity: 0,
            rotate: p.r,
          }}
          transition={{
            duration: tBurst,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            width: p.size,
            height: p.isPetal ? p.size * 1.4 : p.size,
            backgroundColor: p.color,
            borderRadius: p.isPetal ? "50% 50% 50% 0%" : "2px",
          }}
          className="absolute"
        />
      ))}
    </div>
  );
}

