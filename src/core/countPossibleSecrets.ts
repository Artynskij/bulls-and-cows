const cache = new Map<string, number>();

const key = (length: number, base: number): string => `${length}:${base}`;

const compute = (length: number, base: number): number => {
  if (length === 0) return 1;
  if (length > base) return 0;

  const k = key(length, base);
  const cached = cache.get(k);
  if (cached !== undefined) return cached;

  const result = base * compute(length - 1, base - 1);
  cache.set(k, result);
  return result;
};

export const countPossibleSecrets = (length: number, base: number): number => compute(length, base);
