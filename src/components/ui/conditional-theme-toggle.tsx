'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';

export function ConditionalThemeToggle() {
  const pathname = usePathname();
  const isCLIPage = pathname === '/cli';

  // Don't show theme toggle on CLI page
  if (isCLIPage) {
    return null;
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <ThemeToggle />
    </div>
  );
}
