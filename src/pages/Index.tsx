import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from '@/components/Header';
import LobbyView from '@/components/LobbyView';
import JoiningView from '@/components/JoiningView';
import GameView from '@/components/GameView';
import ResultView from '@/components/ResultView';
import { useGameState } from '@/hooks/useGameState';
import { shortenAddress } from '@/lib/mockData';

const Index: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const {
    phase,
    rooms,
    activeRoom,
    currentPrice,
    timeLeft,
    myPrediction,
    roundResolved,
    joinRoom,
    makePrediction,
    claimPrize,
    backToLobby,
  } = useGameState();

  const myAddress = publicKey ? shortenAddress(publicKey.toBase58()) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onLogoClick={backToLobby} />

      <main className="flex-1 pb-8">
        {phase === 'lobby' && (
          <LobbyView
            rooms={rooms}
            currentPrice={currentPrice}
            onJoin={joinRoom}
            walletConnected={connected}
          />
        )}

        {phase === 'joining' && <JoiningView />}

        {phase === 'game' && activeRoom && (
          <GameView
            room={activeRoom}
            currentPrice={currentPrice}
            timeLeft={timeLeft}
            myPrediction={myPrediction}
            roundResolved={roundResolved}
            onPredict={makePrediction}
            onBack={backToLobby}
          />
        )}

        {phase === 'result' && activeRoom && (
          <ResultView
            room={activeRoom}
            myAddress={myAddress}
            onClaim={claimPrize}
            onBack={backToLobby}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-3 text-center">
        <p className="text-[10px] text-muted-foreground">
          SOL Battle Royale &middot; DevNet &middot; Pyth Oracle &middot; 5% dev fee
        </p>
      </footer>
    </div>
  );
};

export default Index;
