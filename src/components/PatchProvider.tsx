'use client';

import { PatchOverlay } from './PatchOverlay';
import { PatchToggle } from './PatchToggle';
import { usePatchStore } from '@/hooks/usePatchStore';

export function PatchProvider() {
  const { isOpen, isInitialized, toggle, close } = usePatchStore();

  // Feature flag to disable Patch
  const PATCH_ENABLED = false;

  if (!isInitialized || !PATCH_ENABLED) {
    return null;
  }

  return (
    <>
      <PatchToggle onClick={toggle} isOpen={isOpen} />
      <PatchOverlay isOpen={isOpen} onClose={close} />
    </>
  );
}
