import { generateSecret } from '../core/generateSecret.js';
export const createInitialState = (settings) => ({
    settings,
    secret: generateSecret(settings.length, settings.base),
    history: [],
    status: 'playing',
    startedAt: Date.now(),
    finishedAt: null,
});
//# sourceMappingURL=createInitialState.js.map