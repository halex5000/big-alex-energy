'use client';

import { useState, useEffect } from 'react';
import { injectPatchStyles } from '@/lib/dispatchPatchAction';

export function usePatchStore() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Inject Patch's CSS styles
    injectPatchStyles();
    setIsInitialized(true);

    // Expose Patch to global scope for CLI integration
    if (typeof window !== 'undefined') {
      window.Patch = {
        toggle: () => setIsOpen(prev => !prev),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen: () => isOpen,
      };
    }
  }, [isOpen]);

  return {
    isOpen,
    isInitialized,
    toggle: () => setIsOpen(prev => !prev),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}

// Global type declaration for Patch
declare global {
  interface Window {
    Patch: {
      toggle: () => void;
      open: () => void;
      close: () => void;
      isOpen: () => boolean;
    };
  }
}
