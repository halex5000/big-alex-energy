'use client';

import { ThemeColors } from '@/contexts/theme-context';

interface TerminalOutputProps {
  output: Array<{ type: 'command' | 'output' | 'error'; content: string }>;
  colors: ThemeColors;
}

export function TerminalOutput({ output, colors }: TerminalOutputProps) {
  return (
    <div className="space-y-1">
      {output.map((line, index) => (
        <div
          key={index}
          className={`whitespace-pre-wrap ${
            line.type === 'command'
              ? colors.textSecondary
              : line.type === 'error'
                ? colors.textError
                : colors.text
          }`}
        >
          {line.content}
        </div>
      ))}
    </div>
  );
}
