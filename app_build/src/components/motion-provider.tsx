"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MotionContextValue {
  isPaused: boolean;
  togglePaused: () => void;
  setPaused: (paused: boolean) => void;
}

const MotionContext = createContext<MotionContextValue>({
  isPaused: false,
  togglePaused: () => {},
  setPaused: () => {},
});

const STORAGE_KEY = "jashn_anim_paused";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initial = saved !== null ? saved === "true" : prefersReduced;
    setIsPaused(initial);
    document.documentElement.classList.toggle("motion-paused", initial);
  }, []);

  const setPaused = (next: boolean) => {
    setIsPaused(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    document.documentElement.classList.toggle("motion-paused", next);
  };

  const togglePaused = () => {
    setPaused(!isPaused);
  };

  return (
    <MotionContext.Provider value={{ isPaused, togglePaused, setPaused }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionContext() {
  return useContext(MotionContext);
}

