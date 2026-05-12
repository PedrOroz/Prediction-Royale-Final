import React from 'react';
import { Room } from '@/lib/types';
import { formatLamports, getAliveCount } from '@/lib/mockData';
import LivesIndicator from './LivesIndicator';
import { Users, Trophy, Clock } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onJoin: (roomId: string) => void;
  walletConnected: boolean;
}

const statusConfig = {
  waiting: {
    label: 'Waiting',
    dotClass: 'bg-life-on',
    textClass: 'text-life-on',
  },
  in_progress: {
    label: 'In Progress',
    dotClass: 'bg-primary',
    textClass: 'text-primary',
  },
  finished: {
    label: 'Finished',
    dotClass: 'bg-life-off',
    textClass: 'text-muted-foreground',
  },
};

const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin, walletConnected }) => {
  const config = statusConfig[room.status];
  const canJoin = room.status === 'waiting' && room.currentPlayers < room.maxPlayers;
  const aliveCount = getAliveCount(room.players);

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{room.name}</h3>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${config.dotClass}`} />
          <span className={`text-xs font-medium ${config.textClass}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-secondary rounded px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground uppercase">Entry</p>
          <p className="text-sm font-mono font-semibold text-foreground">
            {formatLamports(room.entryFee)}
          </p>
        </div>
        <div className="bg-secondary rounded px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground uppercase">Pot</p>
          <p className="text-sm font-mono font-semibold text-claim">
            {formatLamports(room.pot)}
          </p>
        </div>
        <div className="bg-secondary rounded px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground uppercase">Round</p>
          <p className="text-sm font-mono font-semibold text-foreground">
            {room.currentRound}/{room.totalRounds}
          </p>
        </div>
      </div>

      {/* Players */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span className="text-xs">
            {room.status === 'in_progress'
              ? `${aliveCount} alive`
              : `${room.currentPlayers}/${room.maxPlayers}`}
          </span>
        </div>
        {room.status === 'in_progress' && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">Round {room.currentRound}</span>
          </div>
        )}
        {room.winner && (
          <div className="flex items-center gap-1.5 text-claim">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">{room.winner}</span>
          </div>
        )}
      </div>

      {/* Join Button */}
      {canJoin && (
        <button
          onClick={() => onJoin(room.id)}
          disabled={!walletConnected}
          className="w-full py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {walletConnected
            ? `Join — ${formatLamports(room.entryFee)} SOL`
            : 'Connect Wallet to Join'}
        </button>
      )}
      {room.status === 'in_progress' && (
        <div className="w-full py-2.5 rounded-md text-sm font-medium text-center bg-secondary text-muted-foreground">
          Game in progress
        </div>
      )}
      {room.status === 'finished' && (
        <div className="w-full py-2.5 rounded-md text-sm font-medium text-center bg-secondary text-muted-foreground">
          Game ended
        </div>
      )}
    </div>
  );
};

export default RoomCard;
