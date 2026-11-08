import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../core/evaluateGuess.js';

describe('evaluateGuess', () => {
  it('counts all bulls when guess equals secret', () => {
    expect(evaluateGuess('5072', '5072')).toEqual({ bulls: 4, cows: 0 });
  });

  it('counts bulls and cows when digits are misplaced', () => {
    expect(evaluateGuess('5072', '5270')).toEqual({ bulls: 2, cows: 2 });
  });

  it('returns zero for a completely wrong guess', () => {
    expect(evaluateGuess('5072', '1234')).toEqual({ bulls: 0, cows: 1 });
  });

  it('does not count a digit as both bull and cow', () => {
    expect(evaluateGuess('50', '50')).toEqual({ bulls: 2, cows: 0 });
  });

  it('is case-insensitive for hex digits', () => {
    expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
  });

  it('handles leading zeros in secret', () => {
    expect(evaluateGuess('0123', '3210')).toEqual({ bulls: 0, cows: 4 });
  });
});
