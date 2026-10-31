import { getPreset } from "./presets";
import type { CityTier, FeasibilityVerdict, PresetId } from "./schemas";

export type FeasibilityInput = {
  preset: PresetId;
  totalMinor: number;
  guests: number;
  cityTier: CityTier;
};

export function checkFeasibility(input: FeasibilityInput): FeasibilityVerdict {
  if (input.guests <= 0 || input.totalMinor <= 0) {
    return "unrealistic";
  }
  const preset = getPreset(input.preset);
  const floor = preset.floors[input.cityTier];
  const perGuest = Math.floor(input.totalMinor / input.guests);
  if (perGuest >= floor * 1.5) {
    return "comfortable";
  }
  if (perGuest >= floor) {
    return "tight";
  }
  return "unrealistic";
}

