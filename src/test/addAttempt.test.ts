import { describe, it, expect } from 'vitest';
import { addAttempt } from '../state/addAttempt';
import type { GameState } from '../types';

const baseState: GameState = {
  settings: { length: 3, base: 10 },
  secret: '123',
  history: [],
  status: 'playing',
  startedAt: 0,
  finishedAt: null,
};

describe('addAttempt', () => {
  it('adds an attempt immutably', () => {
    const next = addAttempt(baseState, '456');
    expect(baseState.history).toHaveLength(0);
    expect(next.history).toHaveLength(1);
    expect(next).not.toBe(baseState);
  });

  it('marks status won when secret is guessed', () => {
    const next = addAttempt(baseState, '123');
    expect(next.status).toBe('won');
    expect(next.finishedAt).not.toBeNull();
  });

  it('ignores duplicate guesses', () => {
    const first = addAttempt(baseState, '456');
    const second = addAttempt(first, '456');
    expect(second.history).toHaveLength(1);
    expect(second).toBe(first);
  });
});
