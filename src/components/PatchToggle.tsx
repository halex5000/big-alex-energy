'use client';

import { Terminal } from 'lucide-react';

interface PatchToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export function PatchToggle({ onClick, isOpen }: PatchToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 w-12 h-12 rounded-full font-mono text-xs font-bold transition-all duration-300 z-40 ${
        isOpen
          ? 'bg-green-600 text-black scale-90'
          : 'bg-black text-green-400 border-2 border-green-400 hover:bg-green-900/20 hover:scale-110'
      }`}
      title={isOpen ? 'Close Patch' : 'Open Patch'}
    >
      {isOpen ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-lg">(o_~)</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Terminal size={16} />
          <span className="text-[8px] leading-none mt-0.5">PATCH</span>
        </div>
      )}
    </button>
  );
}
