import type { Base, DigitValidator } from '../types';

const DIGITS = '0123456789abcdef';

export const createDigitValidator =
  (base: Base): DigitValidator =>
  (char: string): boolean =>
    char.length === 1 && DIGITS.slice(0, base).includes(char.toLowerCase());
