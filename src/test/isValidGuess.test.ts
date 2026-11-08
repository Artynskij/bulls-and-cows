import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../core/isValidGuess';

describe('isValidGuess', () => {
  it('accepts a valid guess', () => {
    expect(isValidGuess('123', 3, 10)).toBe(true);
  });

  it('rejects a guess with wrong length', () => {
    expect(isValidGuess('12', 3, 10)).toBe(false);
    expect(isValidGuess('1234', 3, 10)).toBe(false);
  });

  it('rejects a guess with a digit invalid for the base', () => {
    expect(isValidGuess('123', 3, 2)).toBe(false);
  });

  it('rejects a guess with repeated digits', () => {
    expect(isValidGuess('112', 3, 10)).toBe(false);
  });

  it('accepts uppercase hex digits', () => {
    expect(isValidGuess('1aF', 3, 16)).toBe(true);
  });
});
