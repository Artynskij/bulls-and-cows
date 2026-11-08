const DIGITS = '0123456789abcdef';
export const generateSecret = (length, base, random = Math.random) => {
    const pool = [...DIGITS.slice(0, base)];
    const result = [];
    for (let i = 0; i < length; i++) {
        const index = Math.floor(random() * pool.length);
        result.push(pool.splice(index, 1)[0]);
    }
    return result.join('');
};
//# sourceMappingURL=generateSecret.js.map