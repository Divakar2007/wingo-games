export enum Color {
  GREEN = 'GREEN',
  VIOLET = 'VIOLET',
  RED = 'RED',
}

export interface GameResult {
  period: string;
  number: number;
  bigSmall: 'Big' | 'Small';
  colors: Color[];
}

export interface GameState {
  timeLeft: number;
  period: string;
  history: GameResult[];
}

export interface AllGameStates {
  [key: string]: GameState;
}

export type BetOption =
  | { type: 'color'; value: Color }
  | { type: 'number'; value: number }
  | { type: 'size'; value: 'Big' | 'Small' };

export interface Bet {
  id: string;
  gameMode: string;
  period: string;
  option: BetOption;
  amount: number;
}
