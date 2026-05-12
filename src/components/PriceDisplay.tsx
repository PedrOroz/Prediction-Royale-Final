import React from 'react';
import { PriceData } from '@/lib/types';

interface PriceDisplayProps {
  price: PriceData;
  startPrice?: number | null;
  label?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  startPrice,
  label = 'SOL / USD',
}) => {
  const priceDelta =
    startPrice != null ? price.price - startPrice : 0;
  const isPositive = priceDelta >= 0;

  return (
    <div className="text-center">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-4xl sm:text-5xl font-mono font-bold text-foreground tracking-tight">
        ${price.price.toFixed(2)}
      </p>
      {startPrice != null && (
        <p
          className={`text-sm font-mono mt-1 ${
            isPositive ? 'text-primary' : 'text-destructive'
          }`}
        >
          {isPositive ? '+' : ''}
          {priceDelta.toFixed(2)} ({((priceDelta / startPrice) * 100).toFixed(2)}%)
        </p>
      )}
      <p className="text-[10px] text-muted-foreground mt-1 font-mono">
        Pyth Oracle &middot; conf &plusmn;{price.confidence.toFixed(3)}
      </p>
    </div>
  );
};

export default PriceDisplay;
