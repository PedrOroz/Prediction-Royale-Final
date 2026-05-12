import React from 'react';
import { Loader2 } from 'lucide-react';

const JoiningView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="text-sm font-medium text-foreground">Joining arena...</p>
      <p className="text-xs text-muted-foreground">
        Confirming transaction on DevNet
      </p>
    </div>
  );
};

export default JoiningView;
