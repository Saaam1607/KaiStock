import { useRef, useCallback } from 'react';

export function useProtectedAction(action: () => Promise<void> | void) {
  const lockedRef = useRef(false);

  const protectedAction = useCallback(async () => {
    if (lockedRef.current) return;

    lockedRef.current = true;

    try {
      await action();
    } finally {
      lockedRef.current = false;
    }
    
  }, [action]);

  return { protectedAction };
}
