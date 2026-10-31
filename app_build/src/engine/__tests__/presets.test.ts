import { getPreset, presets } from "../presets";
import { PresetId } from "../schemas";

describe("presets", () => {
  it("provides valid presets for all preset IDs", () => {
    const ids: PresetId[] = ["wedding", "birthday", "community"];
    for (const id of ids) {
      const p = getPreset(id);
      expect(p.id).toBe(id);
      expect(p.categories.length).toBeGreaterThan(0);
      expect(p.tasks.length).toBeGreaterThan(0);
      expect(p.fallbackIdeas.length).toBeGreaterThan(0);
      expect(p.fallbackQuestions.length).toBeGreaterThan(0);
      expect(p.fallbackRedFlags.length).toBeGreaterThan(0);
      const totalWeight = p.categories.reduce((acc, c) => acc + c.weight, 0);
      expect(Math.abs(totalWeight - 1.0)).toBeLessThan(0.01);
      expect(presets[id]).toBe(p);
    }
  });
});

