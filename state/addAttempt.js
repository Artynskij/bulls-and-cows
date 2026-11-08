import { evaluateGuess } from '../core/evaluateGuess.js';
export const addAttempt = (state, guess) => {
    if (state.history.some((a) => a.guess === guess))
        return state;
    const { bulls, cows } = evaluateGuess(state.secret, guess);
    const attempt = { guess, bulls, cows, timestamp: Date.now() };
    const won = bulls === state.settings.length;
    return {
        ...state,
        history: [...state.history, attempt],
        status: won ? 'won' : 'playing',
        finishedAt: won ? Date.now() : null,
    };
};
//# sourceMappingURL=addAttempt.js.map