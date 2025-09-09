'use client';

import { useEffect, useState } from 'react';
import { PatchOverlay } from './PatchOverlay';
import { PatchToggle } from './PatchToggle';
import { usePatchStore } from '@/hooks/usePatchStore';
import { isPatchEnabled } from '@/lib/statsig';

export function PatchProvider() {
  const { isOpen, isInitialized, toggle, close } = usePatchStore();
  const [patchEnabled, setPatchEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPatchEnabled = async () => {
      try {
        const enabled = await isPatchEnabled();
        setPatchEnabled(enabled);
      } catch (error) {
        console.error('Failed to check Patch feature flag:', error);
        setPatchEnabled(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPatchEnabled();
  }, []);

  // Show loading state or hide if not enabled
  if (isLoading || !isInitialized || !patchEnabled) {
    return null;
  }

  return (
    <>
      <PatchToggle onClick={toggle} isOpen={isOpen} />
      <PatchOverlay isOpen={isOpen} onClose={close} />
    </>
  );
}
