export type Base = 2 | 8 | 10 | 16;

export type Digit = string;

export type DigitValidator = (char: string) => boolean;

export interface BullsCows {
  bulls: number;
  cows: number;
}
export interface BullsCows {
  bulls: number;
  cows: number;
}

export interface Attempt {
  guess: string;
  bulls: number;
  cows: number;
  timestamp: number;
}

export interface Settings {
  length: number;
  base: Base;
}

export type GameStatus = 'playing' | 'won';

export interface GameState {
  settings: Settings;
  secret: string;
  history: Attempt[];
  status: GameStatus;
  startedAt: number;
  finishedAt: number | null;
}

export interface RecordEntry {
  settings: Settings;
  attempts: number;
  timeMs: number;
  date: string;
}
