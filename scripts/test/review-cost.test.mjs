import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewCost } from '../../src/lib/review-cost.mjs';

test('editorial default agrees with the existing static article', () => {
  const [a, b] = reviewCost(0.3);
  assert.equal(a.total, 56);
  assert.equal(b.total, 19.25);
  assert.equal(a.perPassed, 56 / 60);
  assert.equal(b.perPassed, 19.25 / 95);
});
test('zero review cost reverses total cost without changing passed counts', () => {
  assert.deepEqual(reviewCost(0).map(x => [x.total, x.passed]), [[2, 60], [5, 95]]);
  assert.deepEqual(reviewCost(1).map(x => x.total), [182, 52.5]);
  assert.equal(reviewCost(100).length, 2);
});
test('reject invalid rates without coercion or clamping', () => {
  for (const value of ['', '0.3', null, undefined, NaN, Infinity, -1, 100.01]) assert.equal(reviewCost(value), null);
});
