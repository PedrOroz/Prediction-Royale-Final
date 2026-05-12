# Prediction Royale

A multiplayer on-chain prediction game on Solana where players compete to predict SOL price direction and survive until the last standing.

## How It Works

1. **Join a Room** — Choose an arena and pay the entry fee in SOL
2. **Predict Each Round** — Every 45 seconds, predict if the price goes UP or DOWN
3. **Lose a Life on Wrong Predictions** — Wrong predictions cost you a life
4. **Be the Last One Standing** — The last player alive wins the pot

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Wallet**: Solana Wallet Adapter (Phantom compatible)
- **Network**: Solana Devnet

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── GameView.tsx  # Active game view
│   ├── LobbyView.tsx # Room list
│   └── ...
├── hooks/
│   └── useGameState.ts  # Game state management
└── lib/
    ├── types.ts      # TypeScript types
    └── mockData.ts   # Mock data for development
```

## Game Phases

| Phase | Description |
|---|---|
| `lobby` | Browse available rooms and join one |
| `joining` | Processing the join transaction |
| `game` | Active gameplay with price predictions |
| `result` | Game over — claim prize or view winner |

## Notes

- Currently uses mock data for development (no real on-chain program deployed)
- Connects to Solana Devnet by default
- Uses Phantom wallet adapter for wallet connection
- 5% dev fee on all winnings

## Deploy

Connected to Vercel — every push to `main` triggers a new deployment.

## License

MIT
