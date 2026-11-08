const DIGITS = '0123456789abcdef';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random
): string => {
  const pool = [...DIGITS.slice(0, base)];
  const result: string[] = [];

  for (let i = 0; i < length; i++) {
    const index = Math.floor(random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }

  return result.join('');
};
