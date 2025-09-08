'use client';

import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function AnalyticsDebug() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when debug param is present
    const isDev = process.env.NODE_ENV === 'development';
    const hasDebugParam =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('debug');

    setIsVisible(isDev || hasDebugParam);
    setIsDebugMode(analytics.isDebugEnabled());
  }, []);

  const toggleDebugMode = () => {
    const newMode = !isDebugMode;
    setIsDebugMode(newMode);
    analytics.setDebugMode(newMode);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Analytics Debug:</span>
          <button
            onClick={toggleDebugMode}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              isDebugMode
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
            }`}
          >
            {isDebugMode ? 'ON' : 'OFF'}
          </button>
        </div>
        {isDebugMode && (
          <div className="mt-2 text-xs text-muted-foreground">
            Events logged to console
          </div>
        )}
      </div>
    </div>
  );
}
