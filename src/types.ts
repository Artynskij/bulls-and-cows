export type Base = 2 | 8 | 10 | 16;
export type Digit = string;
export type DigitValidator = (char: string) => boolean;
export interface BullsCows {
  bulls: number;
  cows: number;
}
