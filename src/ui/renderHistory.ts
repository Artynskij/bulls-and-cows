import type { Attempt } from '../types.js';
import { el } from './dom.js';

export const renderHistory = (attempts: Attempt[]): HTMLElement => {
  if (attempts.length === 0) {
    return el('p', { className: 'history-empty' }, 'Попыток пока нет');
  }

  const rows = attempts.map((a) =>
    el(
      'li',
      { className: 'history-item' },
      el('span', { className: 'guess' }, a.guess),
      el('span', { className: 'bulls' }, `🐂 ${a.bulls}`),
      el('span', { className: 'cows' }, `🐄 ${a.cows}`)
    )
  );

  return el('ol', { className: 'history' }, ...rows);
};
