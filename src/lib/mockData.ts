import { Room, PriceData, Player } from './types';

const LAMPORTS_PER_SOL = 1_000_000_000;

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-001',
    name: 'Arena Alpha',
    entryFee: 0.05 * LAMPORTS_PER_SOL,
    maxPlayers: 8,
    currentPlayers: 5,
    players: [
      { address: '7xKX...9f3a', lives: 3, prediction: null, eliminated: false },
      { address: '3mPq...8b2c', lives: 2, prediction: null, eliminated: false },
      { address: '9nRt...4d7e', lives: 3, prediction: null, eliminated: false },
      { address: '5kLm...1a6f', lives: 1, prediction: null, eliminated: false },
      { address: '2wYz...7g8h', lives: 0, prediction: null, eliminated: true },
    ],
    pot: 0.25 * LAMPORTS_PER_SOL,
    status: 'waiting',
    currentRound: 0,
    totalRounds: 10,
    roundEndTime: null,
    startPrice: null,
    endPrice: null,
    winner: null,
    devFee: 500,
  },
  {
    id: 'room-002',
    name: 'Arena Beta',
    entryFee: 0.1 * LAMPORTS_PER_SOL,
    maxPlayers: 6,
    currentPlayers: 6,
    players: [
      { address: '4pQr...2c5d', lives: 2, prediction: 'up', eliminated: false },
      { address: '8sVw...6e9f', lives: 3, prediction: 'down', eliminated: false },
      { address: '1aXy...0g3h', lives: 1, prediction: null, eliminated: false },
      { address: '6bZc...4i7j', lives: 0, prediction: null, eliminated: true },
      { address: '0dEf...8k1l', lives: 2, prediction: 'up', eliminated: false },
      { address: '5gHi...2m5n', lives: 0, prediction: null, eliminated: true },
    ],
    pot: 0.6 * LAMPORTS_PER_SOL,
    status: 'in_progress',
    currentRound: 4,
    totalRounds: 10,
    roundEndTime: Date.now() + 45_000,
    startPrice: 168.42,
    endPrice: null,
    winner: null,
    devFee: 500,
  },
  {
    id: 'room-003',
    name: 'Arena Gamma',
    entryFee: 0.5 * LAMPORTS_PER_SOL,
    maxPlayers: 4,
    currentPlayers: 4,
    players: [
      { address: '9jKl...6o9p', lives: 0, prediction: null, eliminated: true },
      { address: '3mNo...0q3r', lives: 2, prediction: null, eliminated: false },
      { address: '7pQr...4s7t', lives: 0, prediction: null, eliminated: true },
      { address: '1sUv...8u1v', lives: 0, prediction: null, eliminated: true },
    ],
    pot: 2.0 * LAMPORTS_PER_SOL,
    status: 'finished',
    currentRound: 8,
    totalRounds: 10,
    roundEndTime: null,
    startPrice: 170.15,
    endPrice: 169.87,
    winner: '3mNo...0q3r',
    devFee: 500,
  },
  {
    id: 'room-004',
    name: 'Arena Delta',
    entryFee: 0.02 * LAMPORTS_PER_SOL,
    maxPlayers: 10,
    currentPlayers: 3,
    players: [
      { address: '2wXy...2a5b', lives: 3, prediction: null, eliminated: false },
      { address: '6zAb...6c9d', lives: 3, prediction: null, eliminated: false },
      { address: '0cDe...0e3f', lives: 3, prediction: null, eliminated: false },
    ],
    pot: 0.06 * LAMPORTS_PER_SOL,
    status: 'waiting',
    currentRound: 0,
    totalRounds: 10,
    roundEndTime: null,
    startPrice: null,
    endPrice: null,
    winner: null,
    devFee: 500,
  },
];

export const MOCK_PRICE: PriceData = {
  price: 168.42,
  confidence: 0.08,
  timestamp: Date.now(),
};

export function formatLamports(lamports: number): string {
  return (lamports / LAMPORTS_PER_SOL).toFixed(2);
}

export function shortenAddress(address: string, chars = 4): string {
  if (address.includes('...')) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function getAliveCount(players: Player[]): number {
  return players.filter((p) => !p.eliminated).length;
}
