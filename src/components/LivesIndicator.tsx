import React from 'react';

interface LivesIndicatorProps {
  lives: number;
  maxLives?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3.5 h-3.5',
  lg: 'w-5 h-5',
};

const LivesIndicator: React.FC<LivesIndicatorProps> = ({
  lives,
  maxLives = 3,
  size = 'md',
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxLives }).map((_, i) => (
        <div
          key={i}
          className={`${sizeMap[size]} rounded-full ${
            i < lives ? 'bg-life-on' : 'bg-life-off'
          }`}
        />
      ))}
    </div>
  );
};

export default LivesIndicator;
