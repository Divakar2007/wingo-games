import { Color, GameResult } from './types';

export const NUMBER_PROPERTIES: { [key: number]: { colors: Color[] } } = {
  0: { colors: [Color.RED, Color.VIOLET] },
  1: { colors: [Color.GREEN] },
  2: { colors: [Color.RED] },
  3: { colors: [Color.GREEN] },
  4: { colors: [Color.RED] },
  5: { colors: [Color.GREEN, Color.VIOLET] },
  6: { colors: [Color.RED] },
  7: { colors: [Color.GREEN] },
  8: { colors: [Color.RED] },
  9: { colors: [Color.GREEN] },
};

const WINGO_30_SEC_HISTORY: GameResult[] = [
  { period: '20250808100010906', number: 1, bigSmall: 'Small', colors: [Color.GREEN] },
  { period: '20250808100010905', number: 1, bigSmall: 'Small', colors: [Color.GREEN] },
  { period: '20250808100010904', number: 2, bigSmall: 'Small', colors: [Color.RED] },
  { period: '20250808100010903', number: 9, bigSmall: 'Big', colors: [Color.GREEN] },
  { period: '20250808100010902', number: 5, bigSmall: 'Big', colors: [Color.GREEN, Color.VIOLET] },
];

const WINGO_1_MIN_HISTORY: GameResult[] = [
  { period: '2025081400051668', number: 4, bigSmall: 'Small', colors: [Color.RED] },
  { period: '2025081400051667', number: 5, bigSmall: 'Big', colors: [Color.GREEN, Color.VIOLET] },
  { period: '2025081400051666', number: 9, bigSmall: 'Big', colors: [Color.GREEN] },
  { period: '2025081400051665', number: 3, bigSmall: 'Small', colors: [Color.GREEN] },
  { period: '2025081400051664', number: 6, bigSmall: 'Big', colors: [Color.RED] },
];

const WINGO_3_MIN_HISTORY: GameResult[] = [
    { period: '2025090100340012', number: 8, bigSmall: 'Big', colors: [Color.RED] },
    { period: '2025090100340011', number: 0, bigSmall: 'Small', colors: [Color.RED, Color.VIOLET] },
    { period: '2025090100340010', number: 3, bigSmall: 'Small', colors: [Color.GREEN] },
    { period: '2025090100340009', number: 7, bigSmall: 'Big', colors: [Color.GREEN] },
    { period: '2025090100340008', number: 2, bigSmall: 'Small', colors: [Color.RED] },
];

const WINGO_5_MIN_HISTORY: GameResult[] = [
    { period: '2025102201000005', number: 5, bigSmall: 'Big', colors: [Color.GREEN, Color.VIOLET] },
    { period: '2025102201000004', number: 6, bigSmall: 'Big', colors: [Color.RED] },
    { period: '2025102201000003', number: 1, bigSmall: 'Small', colors: [Color.GREEN] },
    { period: '2025102201000002', number: 9, bigSmall: 'Big', colors: [Color.GREEN] },
    { period: '2025102201000001', number: 4, bigSmall: 'Small', colors: [Color.RED] },
];


export const GAME_MODES: { [key: string]: { duration: number; initialHistory: GameResult[] } } = {
  'WinGo 30sec': { duration: 30, initialHistory: WINGO_30_SEC_HISTORY },
  'WinGo 1 Min': { duration: 60, initialHistory: WINGO_1_MIN_HISTORY },
  'WinGo 3 Min': { duration: 180, initialHistory: WINGO_3_MIN_HISTORY },
  'WinGo 5 Min': { duration: 300, initialHistory: WINGO_5_MIN_HISTORY },
};

export const PAYOUTS = {
  COLOR: {
      [Color.GREEN]: 2,
      [Color.RED]: 2,
      [Color.VIOLET]: 4.5,
  },
  NUMBER: 9,
  SIZE: 2,
};
