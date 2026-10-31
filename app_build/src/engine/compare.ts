import type { QuoteVerdict } from "./schemas";

export type CompareInput = {
  quoteAmount: number;
  allocationAmount: number;
};

export type CompareOutput = {
  verdict: QuoteVerdict;
  deltaPct: number;
  deltaMinor: number;
};

export function compareQuote(input: CompareInput): CompareOutput {
  const deltaMinor = input.quoteAmount - input.allocationAmount;
  if (input.allocationAmount === 0) {
    if (input.quoteAmount === 0) {
      return { verdict: "within", deltaPct: 0, deltaMinor: 0 };
    }
    return { verdict: "over", deltaPct: 100, deltaMinor };
  }
  const ratio = input.quoteAmount / input.allocationAmount;
  const deltaPct = Math.round((deltaMinor / input.allocationAmount) * 10000) / 100;
  if (ratio < 0.95) {
    return { verdict: "under", deltaPct, deltaMinor };
  }
  if (ratio <= 1.05) {
    return { verdict: "within", deltaPct, deltaMinor };
  }
  return { verdict: "over", deltaPct, deltaMinor };
}

