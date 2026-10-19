// 2026-10-19 editorial example, not observed provider prices or model performance.
export function reviewCost(rate) {
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate < 0 || rate > 100) return null;
  return [{ name: 'A', calls: 2, passed: 60, minutes: 3 }, { name: 'B', calls: 5, passed: 95, minutes: 0.5 }].map(x => {
    const review = x.passed * x.minutes * rate;
    return { ...x, review, total: x.calls + review, perPassed: (x.calls + review) / x.passed };
  });
}
