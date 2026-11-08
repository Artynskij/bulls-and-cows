export const evaluateGuess = (secret, guess) => {
    const secretChars = [...secret.toLowerCase()];
    const guessChars = [...guess.toLowerCase()];
    const bulls = guessChars.filter((digit, i) => digit === secretChars[i]).length;
    const cows = guessChars.filter((digit, i) => digit !== secretChars[i] && secretChars.includes(digit)).length;
    return { bulls, cows };
};
//# sourceMappingURL=evaluateGuess.js.map