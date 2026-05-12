export type GamePhase = 'lobby' | 'joining' | 'game' | 'result';

export type Prediction = 'up' | 'down' | null;

export interface Player {
  address: string;
  lives: number;
  prediction: Prediction;
  eliminated: boolean;
}

export interface Room {
  id: string;
  name: string;
  entryFee: number; // in lamports
  maxPlayers: number;
  currentPlayers: number;
  players: Player[];
  pot: number; // total lamports in pool
  status: 'waiting' | 'in_progress' | 'finished';
  currentRound: number;
  totalRounds: number;
  roundEndTime: number | null; // unix timestamp
  startPrice: number | null;
  endPrice: number | null;
  winner: string | null;
  devFee: number; // 5% = 500 bps
}

export interface PriceData {
  price: number;
  confidence: number;
  timestamp: number;
}
