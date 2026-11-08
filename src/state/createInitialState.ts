import type { GameState, Settings } from '../types';
import { generateSecret } from '../core/generateSecret';

export const createInitialState = (settings: Settings): GameState => ({
  settings,
  secret: generateSecret(settings.length, settings.base),
  history: [],
  status: 'playing',
  startedAt: Date.now(),
  finishedAt: null,
});
