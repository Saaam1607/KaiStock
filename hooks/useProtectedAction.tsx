import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';

export function useProtectedAction(action: () => void | Promise<void>) {
  const [isLocked, setIsLocked] = useState(false);

  const protectedAction = useCallback(async () => {
    
    if (isLocked) return;
    
    setIsLocked(true);

    try {
      Keyboard.dismiss();
      await action();
    } finally {
      setIsLocked(false);
    }

  }, [isLocked, action]);

  return { protectedAction };
}