export const tPress = 0.14;
export const tHover = 0.18;
export const tUi = 0.24;
export const tReveal = 0.8;
export const tBurst = 1.2;

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: tUi, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: tPress, ease: easeOut } },
};

export const slideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: tUi, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: tPress, ease: easeOut } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: tUi, ease: easeOut } },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: easeInOut } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: easeInOut } },
};

