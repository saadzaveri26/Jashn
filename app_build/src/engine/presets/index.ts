import type { PresetId } from "../schemas";
import { birthdayPreset } from "./birthday";
import { communityPreset } from "./community";
import { weddingPreset, type PresetData } from "./wedding";

export type { PresetData };

export const presets: Record<PresetId, PresetData> = {
  wedding: weddingPreset,
  birthday: birthdayPreset,
  community: communityPreset,
};

export function getPreset(id: PresetId): PresetData {
  return presets[id];
}

