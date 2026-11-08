import type { BullsCows } from '../types';

export const evaluateGuess = (secret: string, guess: string): BullsCows => {
  const secretChars = [...secret.toLowerCase()];
  const guessChars = [...guess.toLowerCase()];

  const bulls = guessChars.filter((digit, i) => digit === secretChars[i]).length;

  const cows = guessChars.filter(
    (digit, i) => digit !== secretChars[i] && secretChars.includes(digit)
  ).length;

  return { bulls, cows };
};
