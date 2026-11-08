import type { Attempt, GameState } from '../types';
import { evaluateGuess } from '../core/evaluateGuess';

export const addAttempt = (state: GameState, guess: string): GameState => {
  if (state.history.some((a) => a.guess === guess)) return state;

  const { bulls, cows } = evaluateGuess(state.secret, guess);
  const attempt: Attempt = { guess, bulls, cows, timestamp: Date.now() };

  const won = bulls === state.settings.length;

  return {
    ...state,
    history: [...state.history, attempt],
    status: won ? 'won' : 'playing',
    finishedAt: won ? Date.now() : null,
  };
};
