import { el } from './dom.js';
export const renderRecords = (records) => {
    if (records.length === 0) {
        return el('p', { className: 'records-empty' }, 'Рекордов пока нет');
    }
    const rows = records.map((r) => el('li', { className: 'record-item' }, el('span', { className: 'attempts' }, `${r.attempts} попыток`), el('span', { className: 'time' }, `${(r.timeMs / 1000).toFixed(1)} с`), el('span', { className: 'badge' }, `${r.settings.length}/${r.settings.base}`)));
    return el('section', { className: 'records' }, el('h2', {}, 'Рекорды'), el('ol', {}, ...rows));
};
//# sourceMappingURL=renderRecords.js.map