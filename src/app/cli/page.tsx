'use client';

import { Terminal } from '@/components/cli/terminal';
import { ThemeProvider } from '@/contexts/theme-context';

export default function CLIPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-mono">
        <Terminal />
      </div>
    </ThemeProvider>
  );
}
