import React from 'react';
import { Room, PriceData } from '@/lib/types';
import RoomCard from './RoomCard';
import PriceDisplay from './PriceDisplay';

interface LobbyViewProps {
  rooms: Room[];
  currentPrice: PriceData;
  onJoin: (roomId: string) => void;
  walletConnected: boolean;
}

const LobbyView: React.FC<LobbyViewProps> = ({
  rooms,
  currentPrice,
  onJoin,
  walletConnected,
}) => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto">
      {/* Price ticker */}
      <div className="bg-card border border-border rounded-lg p-5">
        <PriceDisplay price={currentPrice} />
      </div>

      {/* Rooms header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Open Arenas
        </h2>
        <span className="text-xs text-muted-foreground">
          {rooms.length} rooms
        </span>
      </div>

      {/* Room grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onJoin={onJoin}
            walletConnected={walletConnected}
          />
        ))}
      </div>

      {/* Rules */}
      <div className="bg-secondary border border-border rounded-lg p-4">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
          How it works
        </h3>
        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Pay the entry fee to join an arena</li>
          <li>Each round, predict if SOL/USD goes UP or DOWN</li>
          <li>Wrong prediction = lose 1 life (3 lives total)</li>
          <li>Last player standing claims the pot (5% dev fee)</li>
        </ol>
      </div>
    </div>
  );
};

export default LobbyView;
