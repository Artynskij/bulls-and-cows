import { el, mount } from './dom.js';
import { renderHistory } from './renderHistory.js';
export const renderGame = (parent, options) => {
    const { state, onGuess, onNewGame, isValidChar } = options;
    const input = el('input', {
        type: 'text',
        inputmode: 'text',
        autocomplete: 'off',
        maxlength: state.settings.length,
        placeholder: `Введите ${state.settings.length} цифр`,
    });
    input.addEventListener('input', () => {
        const filtered = [...input.value].filter(isValidChar).join('').toLowerCase();
        if (input.value !== filtered)
            input.value = filtered;
    });
    const submit = () => {
        onGuess(input.value.toLowerCase());
        input.value = '';
        input.focus();
    };
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter')
            submit();
    });
    const submitBtn = el('button', { type: 'button', className: 'primary' }, 'Проверить');
    submitBtn.addEventListener('click', submit);
    const newGameBtn = el('button', { type: 'button' }, 'Новая игра');
    newGameBtn.addEventListener('click', onNewGame);
    const status = state.status === 'won'
        ? el('p', { className: 'status won' }, `🎉 Угадано за ${state.history.length} попыток!`)
        : null;
    const children = [
        el('header', { className: 'game-header' }, el('h2', {}, `Длина ${state.settings.length}, база ${state.settings.base}`), newGameBtn),
        el('div', { className: 'input-row' }, input, submitBtn),
        renderHistory(state.history),
    ];
    if (status)
        children.splice(1, 0, status);
    mount(parent, ...children);
    input.focus();
};
//# sourceMappingURL=renderGame.js.map