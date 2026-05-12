import React from 'react';
import { Player } from '@/lib/types';
import LivesIndicator from './LivesIndicator';

interface PlayerRowProps {
  player: Player;
  isMe?: boolean;
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, isMe = false }) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded ${
        player.eliminated
          ? 'opacity-40'
          : isMe
          ? 'bg-surface-elevated'
          : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-mono ${
            isMe ? 'text-primary font-semibold' : 'text-foreground'
          }`}
        >
          {player.address}
          {isMe && ' (you)'}
        </span>
        {player.eliminated && (
          <span className="text-[10px] text-destructive font-medium uppercase">
            OUT
          </span>
        )}
      </div>
      <LivesIndicator lives={player.lives} size="sm" />
    </div>
  );
};

export default PlayerRow;
