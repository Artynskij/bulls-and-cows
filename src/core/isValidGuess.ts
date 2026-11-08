import type { Base } from '../types';
import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: Base): boolean => {
  if (guess.length !== length) return false;

  const chars = [...guess.toLowerCase()];
  const isValidDigit = createDigitValidator(base);

  const allValid = chars.every(isValidDigit);
  const allUnique = new Set(chars).size === chars.length;

  return allValid && allUnique;
};
