import type { GameState, Settings } from '../types.js';
import { generateSecret } from '../core/generateSecret.js';

export const createInitialState = (settings: Settings): GameState => ({
  settings,
  secret: generateSecret(settings.length, settings.base),
  history: [],
  status: 'playing',
  startedAt: Date.now(),
  finishedAt: null,
});
