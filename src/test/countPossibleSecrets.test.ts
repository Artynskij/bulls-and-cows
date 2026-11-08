import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../core/countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it('returns 1 when length is 0 (empty secret)', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns base when length is 1', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 2)).toBe(2);
    expect(countPossibleSecrets(1, 16)).toBe(16);
  });

  it('computes permutations for length 2', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(2, 8)).toBe(56);
  });

  it('computes permutations for length equal to base', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(4, 4)).toBe(24);
  });

  it('computes real game values', () => {
    expect(countPossibleSecrets(6, 10)).toBe(151200);
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
    expect(countPossibleSecrets(6, 4)).toBe(0);
  });

  it('is memoized: repeated calls are consistent', () => {
    const first = countPossibleSecrets(4, 10);
    const second = countPossibleSecrets(4, 10);
    expect(first).toBe(second);
    expect(first).toBe(5040);
  });
});
