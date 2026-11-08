import { createDigitValidator } from './core/createDigitValidator.js';
import { isValidGuess } from './core/isValidGuess.js';
import { createInitialState } from './state/createInitialState.js';
import { addAttempt } from './state/addAttempt.js';
import { loadRecords, saveRecord } from './state/records.js';
import { renderSettings } from './ui/renderSettings.js';
import { renderGame } from './ui/renderGame.js';
import { renderRecords } from './ui/renderRecords.js';
const root = document.getElementById('app');
let state = null;
const renderRecordsBlock = () => renderRecords(loadRecords());
const showSettings = () => {
    state = null;
    renderSettings(root, {
        initial: { length: 4, base: 10 },
        onStart: (settings) => {
            state = createInitialState(settings);
            showGame();
        },
    });
    root.append(renderRecordsBlock());
};
const showGame = () => {
    if (!state)
        return;
    const isValidChar = createDigitValidator(state.settings.base);
    renderGame(root, {
        state,
        isValidChar,
        onNewGame: () => showSettings(),
        onGuess: (guess) => {
            if (!state)
                return;
            const current = state;
            if (!isValidGuess(guess, current.settings.length, current.settings.base))
                return;
            const previousStatus = current.status;
            const next = addAttempt(current, guess);
            state = next;
            if (next.status === 'won' && previousStatus !== 'won') {
                const record = {
                    settings: { ...next.settings },
                    attempts: next.history.length,
                    timeMs: (next.finishedAt ?? Date.now()) - next.startedAt,
                    date: new Date().toISOString(),
                };
                saveRecord(record);
            }
            showGame();
        },
    });
    root.append(renderRecordsBlock());
};
showSettings();
//# sourceMappingURL=app.js.map