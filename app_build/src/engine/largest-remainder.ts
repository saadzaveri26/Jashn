export function distributeByLargestRemainder(total: number, weights: number[]): number[] {
  if (weights.length === 0) return [];
  if (total <= 0) return weights.map(() => 0);
  const sumWeights = weights.reduce((acc, w) => acc + w, 0);
  if (sumWeights === 0) {
    const base = Math.floor(total / weights.length);
    let rem = total - base * weights.length;
    return weights.map(() => {
      if (rem > 0) {
        rem -= 1;
        return base + 1;
      }
      return base;
    });
  }
  const exacts = weights.map((w) => (w / sumWeights) * total);
  const floors = exacts.map((e) => Math.floor(e));
  const allocated = floors.reduce((acc, f) => acc + f, 0);
  const deficit = total - allocated;
  const withIndex = exacts.map((e, idx) => ({
    idx,
    rem: e - floors[idx],
  }));
  withIndex.sort((a, b) => b.rem - a.rem);
  const result = [...floors];
  for (let i = 0; i < deficit; i++) {
    const target = withIndex[i % withIndex.length].idx;
    result[target] += 1;
  }
  return result;
}

