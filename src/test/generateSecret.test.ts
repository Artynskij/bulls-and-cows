import { describe, it, expect } from 'vitest';
import { generateSecret } from '../core/generateSecret.js';

const zeroRandom = () => 0;

const makeSequenceRandom = (values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe('generateSecret', () => {
  it('returns a string of the requested length', () => {
    const secret = generateSecret(4, 10, zeroRandom);
    expect(secret).toHaveLength(4);
  });

  it('uses only digits valid for the base', () => {
    const secret = generateSecret(4, 10, zeroRandom);
    for (const char of secret) {
      expect('0123456789').toContain(char);
    }
  });

  it('generates unique digits', () => {
    const secret = generateSecret(4, 10, zeroRandom);
    expect(new Set(secret).size).toBe(secret.length);
  });

  it('is deterministic when random is fixed', () => {
    const a = generateSecret(4, 10, zeroRandom);
    const b = generateSecret(4, 10, zeroRandom);
    expect(a).toBe(b);
  });

  it('produces different secrets with different random sequences', () => {
    const first = generateSecret(4, 10, makeSequenceRandom([0, 0, 0, 0]));

    const second = generateSecret(4, 10, makeSequenceRandom([0.5, 0.5, 0.5, 0.5]));
    expect(first).not.toBe(second);
  });

  it('works for binary base', () => {
    const secret = generateSecret(2, 2, zeroRandom);
    expect(secret).toHaveLength(2);
    expect(secret).toMatch(/^[01]{2}$/);
  });
});
