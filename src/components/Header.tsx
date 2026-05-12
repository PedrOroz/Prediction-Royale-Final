import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Crosshair } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Crosshair className="w-5 h-5 text-primary" />
        <span className="text-base font-bold tracking-tight text-foreground">
          SOL Battle
        </span>
        <span className="text-xs font-mono text-muted-foreground ml-1 hidden sm:inline">
          DEVNET
        </span>
      </button>

      <WalletMultiButton />
    </header>
  );
};

export default Header;
