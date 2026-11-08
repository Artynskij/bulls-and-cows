import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { el, mount } from './dom.js';
const BASES = [
    { value: 2, label: 'Binary (2)' },
    { value: 8, label: 'Octal (8)' },
    { value: 10, label: 'Decimal (10)' },
    { value: 16, label: 'Hexadecimal (16)' },
];
const LENGTHS = [2, 3, 4, 5, 6];
export const renderSettings = (parent, options) => {
    let current = { ...options.initial };
    const lengthButtons = LENGTHS.map((len) => el('button', { type: 'button', 'data-length': len }, String(len)));
    const baseButtons = BASES.map((b) => el('button', { type: 'button', 'data-base': b.value }, b.label));
    const info = el('p', { className: 'settings-info' });
    const updateDisabled = () => {
        for (const btn of lengthButtons) {
            const len = Number(btn.dataset.length);
            const disabled = len > current.base;
            btn.disabled = disabled;
            btn.classList.toggle('active', len === current.length);
        }
        for (const btn of baseButtons) {
            btn.classList.toggle('active', Number(btn.dataset.base) === current.base);
        }
        info.textContent = `Возможных секретов: ${countPossibleSecrets(current.length, current.base)}`;
    };
    for (const btn of lengthButtons) {
        btn.addEventListener('click', () => {
            current = { ...current, length: Number(btn.dataset.length) };
            updateDisabled();
        });
    }
    for (const btn of baseButtons) {
        btn.addEventListener('click', () => {
            const newBase = Number(btn.dataset.base);
            const newLength = Math.min(current.length, newBase);
            current = { ...current, base: newBase, length: newLength };
            updateDisabled();
        });
    }
    const startBtn = el('button', { type: 'button', className: 'primary' }, 'Начать игру');
    startBtn.addEventListener('click', () => options.onStart(current));
    updateDisabled();
    mount(parent, el('h1', {}, 'Bulls and Cows'), el('section', { className: 'settings' }, el('h2', {}, 'Длина'), el('div', { className: 'row' }, ...lengthButtons), el('h2', {}, 'Система счисления'), el('div', { className: 'row' }, ...baseButtons), info, startBtn));
};
//# sourceMappingURL=renderSettings.js.map