'use client';

import { useEffect } from 'react';
import { Terminal } from '@/components/cli/terminal';
import { ThemeProvider } from '@/contexts/theme-context';

export default function CLIPage() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'alex@bigalexenergy:~$';

    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen font-mono">
        <Terminal />
      </div>
    </ThemeProvider>
  );
}
