import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
    if (guess.length !== length)
        return false;
    const chars = [...guess.toLowerCase()];
    const isValidDigit = createDigitValidator(base);
    const allValid = chars.every(isValidDigit);
    const allUnique = new Set(chars).size === chars.length;
    return allValid && allUnique;
};
//# sourceMappingURL=isValidGuess.js.map