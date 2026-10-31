function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function channelLuminance(c: number): number {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Design Token Contrast (WCAG AA)", () => {
  const lightTokens = {
    bg: "#faf7f2",
    fg: "#1f1610",
    card: "#ffffff",
    cardFg: "#1f1610",
    accent: "#b45309",
    accentFg: "#ffffff",
    mutedFg: "#635347",
  };

  const darkTokens = {
    bg: "#160d1f",
    fg: "#faf5ee",
    card: "#231631",
    cardFg: "#faf5ee",
    accent: "#f5b738",
    accentFg: "#160d1f",
    mutedFg: "#c5b6cf",
  };

  const eventThemes = {
    wedding: {
      light: { accent: "#9d174d", accentFg: "#ffffff" },
      dark: { accent: "#f5b738", accentFg: "#160d1f" },
    },
    birthday: {
      light: { accent: "#c2410c", accentFg: "#ffffff" },
      dark: { accent: "#fb923c", accentFg: "#160d1f" },
    },
    community: {
      light: { accent: "#0f766e", accentFg: "#ffffff" },
      dark: { accent: "#2dd4bf", accentFg: "#160d1f" },
    },
  };

  it("passes WCAG AA (>= 4.5:1) for light mode tokens", () => {
    expect(contrastRatio(lightTokens.bg, lightTokens.fg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(lightTokens.card, lightTokens.cardFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(lightTokens.accent, lightTokens.accentFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(lightTokens.bg, lightTokens.mutedFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(lightTokens.card, lightTokens.mutedFg)).toBeGreaterThanOrEqual(4.5);
  });

  it("passes WCAG AA (>= 4.5:1) for dark mode tokens", () => {
    expect(contrastRatio(darkTokens.bg, darkTokens.fg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(darkTokens.card, darkTokens.cardFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(darkTokens.accent, darkTokens.accentFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(darkTokens.bg, darkTokens.mutedFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(darkTokens.card, darkTokens.mutedFg)).toBeGreaterThanOrEqual(4.5);
  });

  it("passes WCAG AA (>= 4.5:1) for wedding event theme in light and dark", () => {
    expect(contrastRatio(eventThemes.wedding.light.accent, eventThemes.wedding.light.accentFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(eventThemes.wedding.dark.accent, eventThemes.wedding.dark.accentFg)).toBeGreaterThanOrEqual(4.5);
  });

  it("passes WCAG AA (>= 4.5:1) for birthday event theme in light and dark", () => {
    expect(contrastRatio(eventThemes.birthday.light.accent, eventThemes.birthday.light.accentFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(eventThemes.birthday.dark.accent, eventThemes.birthday.dark.accentFg)).toBeGreaterThanOrEqual(4.5);
  });

  it("passes WCAG AA (>= 4.5:1) for community event theme in light and dark", () => {
    expect(contrastRatio(eventThemes.community.light.accent, eventThemes.community.light.accentFg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(eventThemes.community.dark.accent, eventThemes.community.dark.accentFg)).toBeGreaterThanOrEqual(4.5);
  });
});
