import React from 'react';
import { Room, PriceData, Prediction } from '@/lib/types';
import { formatLamports, getAliveCount } from '@/lib/mockData';
import PriceDisplay from './PriceDisplay';
import LivesIndicator from './LivesIndicator';
import PlayerRow from './PlayerRow';
import { ArrowUp, ArrowDown, Clock, Users, Trophy } from 'lucide-react';

interface GameViewProps {
  room: Room;
  currentPrice: PriceData;
  timeLeft: number;
  myPrediction: Prediction;
  roundResolved: boolean;
  onPredict: (prediction: Prediction) => void;
  onBack: () => void;
}

const GameView: React.FC<GameViewProps> = ({
  room,
  currentPrice,
  timeLeft,
  myPrediction,
  roundResolved,
  onPredict,
  onBack,
}) => {
  const aliveCount = getAliveCount(room.players);
  const myPlayer = room.players[0];
  const isEliminated = myPlayer?.eliminated;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Leave
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">{aliveCount} alive</span>
          </div>
          <div className="flex items-center gap-1.5 text-claim">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">{formatLamports(room.pot)} SOL</span>
          </div>
        </div>
      </div>

      {/* Room info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">{room.name}</h2>
            <p className="text-xs text-muted-foreground">
              Round {room.currentRound} / {room.totalRounds}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span
              className={`text-lg font-mono font-bold ${
                timeLeft <= 10 ? 'text-destructive' : 'text-foreground'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* My lives */}
        {myPlayer && (
          <div className="flex items-center justify-between bg-secondary rounded px-3 py-2 mb-4">
            <span className="text-xs text-muted-foreground">Your lives</span>
            <LivesIndicator lives={myPlayer.lives} size="lg" />
          </div>
        )}

        {/* Price */}
        <div className="py-4">
          <PriceDisplay
            price={currentPrice}
            startPrice={room.startPrice}
          />
        </div>

        {/* Round result feedback */}
        {roundResolved && room.endPrice != null && (
          <div className="bg-secondary rounded-lg p-3 mb-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Round resolved</p>
            <p className="text-sm font-mono font-semibold text-foreground">
              ${room.startPrice?.toFixed(2)} → ${room.endPrice.toFixed(2)}
            </p>
            <p
              className={`text-xs font-medium mt-1 ${
                room.endPrice >= (room.startPrice || 0)
                  ? 'text-primary'
                  : 'text-destructive'
              }`}
            >
              Price went {room.endPrice >= (room.startPrice || 0) ? 'UP' : 'DOWN'}
            </p>
          </div>
        )}

        {/* Prediction buttons */}
        {!isEliminated && !roundResolved && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => onPredict('up')}
              disabled={myPrediction !== null}
              className={`flex items-center justify-center gap-2 py-4 rounded-lg text-sm font-semibold transition-opacity ${
                myPrediction === 'up'
                  ? 'bg-primary text-primary-foreground'
                  : myPrediction !== null
                  ? 'bg-secondary text-muted-foreground opacity-40 cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
              UP
            </button>
            <button
              onClick={() => onPredict('down')}
              disabled={myPrediction !== null}
              className={`flex items-center justify-center gap-2 py-4 rounded-lg text-sm font-semibold transition-opacity ${
                myPrediction === 'down'
                  ? 'bg-destructive text-destructive-foreground'
                  : myPrediction !== null
                  ? 'bg-secondary text-muted-foreground opacity-40 cursor-not-allowed'
                  : 'bg-destructive text-destructive-foreground hover:opacity-90'
              }`}
            >
              <ArrowDown className="w-5 h-5" />
              DOWN
            </button>
          </div>
        )}

        {myPrediction && !roundResolved && (
          <p className="text-xs text-center text-muted-foreground mt-3">
            You predicted{' '}
            <span className={myPrediction === 'up' ? 'text-primary' : 'text-destructive'}>
              {myPrediction.toUpperCase()}
            </span>
            . Waiting for round to end...
          </p>
        )}

        {isEliminated && (
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-destructive">You have been eliminated</p>
            <button
              onClick={onBack}
              className="text-xs text-muted-foreground hover:text-foreground mt-2 underline"
            >
              Return to lobby
            </button>
          </div>
        )}
      </div>

      {/* Players list */}
      <div className="bg-card border border-border rounded-lg p-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
          Players
        </h3>
        <div className="space-y-1">
          {room.players.map((player, i) => (
            <PlayerRow key={player.address} player={player} isMe={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameView;
