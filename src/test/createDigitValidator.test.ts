import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../core/createDigitValidator.js';

describe('createDigitValidator', () => {
  it('accepts a valid digit for the base', () => {
    expect(createDigitValidator(10)('5')).toBe(true);
  });

  it('rejects an invalid digit for the base', () => {
    expect(createDigitValidator(2)('2')).toBe(false);
  });
});
