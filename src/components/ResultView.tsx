import React from 'react';
import { Room } from '@/lib/types';
import { formatLamports } from '@/lib/mockData';
import LivesIndicator from './LivesIndicator';
import { Trophy, ArrowLeft } from 'lucide-react';

interface ResultViewProps {
  room: Room;
  myAddress: string | null;
  onClaim: () => void;
  onBack: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({
  room,
  myAddress,
  onClaim,
  onBack,
}) => {
  const LAMPORTS_PER_SOL = 1_000_000_000;
  const devFeeAmount = (room.pot * room.devFee) / 10000;
  const prizeAmount = room.pot - devFeeAmount;
  const isWinner = room.winner && myAddress && room.winner === myAddress;

  // Sort players: alive first, then by lives
  const sortedPlayers = [...room.players].sort((a, b) => {
    if (a.eliminated && !b.eliminated) return 1;
    if (!a.eliminated && b.eliminated) return -1;
    return b.lives - a.lives;
  });

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Lobby
      </button>

      {/* Result card */}
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Trophy className="w-10 h-10 text-claim mx-auto mb-3" />
        <h2 className="text-lg font-bold text-foreground mb-1">
          {room.name} — Finished
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Round {room.currentRound - 1} / {room.totalRounds}
        </p>

        {/* Winner */}
        {room.winner ? (
          <div className="bg-secondary rounded-lg p-4 mb-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Winner
            </p>
            <p className="text-sm font-mono font-bold text-claim">
              {room.winner}
            </p>
          </div>
        ) : (
          <div className="bg-secondary rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground">No survivors</p>
          </div>
        )}

        {/* Prize breakdown */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-secondary rounded px-2 py-2">
            <p className="text-[10px] text-muted-foreground uppercase">Total Pot</p>
            <p className="text-sm font-mono font-semibold text-foreground">
              {formatLamports(room.pot)}
            </p>
          </div>
          <div className="bg-secondary rounded px-2 py-2">
            <p className="text-[10px] text-muted-foreground uppercase">Dev Fee (5%)</p>
            <p className="text-sm font-mono font-semibold text-muted-foreground">
              {formatLamports(devFeeAmount)}
            </p>
          </div>
          <div className="bg-secondary rounded px-2 py-2">
            <p className="text-[10px] text-muted-foreground uppercase">Prize</p>
            <p className="text-sm font-mono font-bold text-claim">
              {formatLamports(prizeAmount)}
            </p>
          </div>
        </div>

        {/* Claim button */}
        {isWinner ? (
          <button
            onClick={onClaim}
            className="w-full py-3 rounded-lg text-sm font-bold bg-claim text-background hover:opacity-90 transition-opacity"
          >
            Claim {formatLamports(prizeAmount)} SOL
          </button>
        ) : room.winner ? (
          <div className="w-full py-3 rounded-lg text-sm font-medium text-center bg-secondary text-muted-foreground">
            You did not win this round
          </div>
        ) : (
          <div className="w-full py-3 rounded-lg text-sm font-medium text-center bg-secondary text-muted-foreground">
            No winner — pot returned
          </div>
        )}
      </div>

      {/* Final standings */}
      <div className="bg-card border border-border rounded-lg p-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
          Final Standings
        </h3>
        <div className="space-y-1">
          {sortedPlayers.map((player, i) => (
            <div
              key={player.address}
              className={`flex items-center justify-between px-3 py-2 rounded ${
                player.eliminated ? 'opacity-40' : ''
              } ${!player.eliminated ? 'bg-surface-elevated' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-4">
                  #{i + 1}
                </span>
                <span className="text-xs font-mono text-foreground">
                  {player.address}
                </span>
                {!player.eliminated && room.winner === player.address && (
                  <Trophy className="w-3 h-3 text-claim" />
                )}
              </div>
              <LivesIndicator lives={player.lives} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultView;
