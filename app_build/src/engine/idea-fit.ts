import type { CostBand, IdeaFitResult } from "./schemas";

export type IdeaFitsInput = {
  costBand: CostBand;
  allocationAmount: number;
};

const bandFractions: Record<CostBand, number> = {
  low: 0.15,
  medium: 0.35,
  high: 0.60,
};

export function ideaFits(input: IdeaFitsInput): IdeaFitResult {
  const fraction = bandFractions[input.costBand];
  const bandCeiling = Math.floor(input.allocationAmount * fraction);
  return {
    fits: input.allocationAmount > 0,
    bandCeiling,
    allocation: input.allocationAmount,
  };
}

