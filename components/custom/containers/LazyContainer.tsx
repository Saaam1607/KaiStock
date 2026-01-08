import React, { useEffect, useState } from 'react';
import { View, InteractionManager, ActivityIndicator } from 'react-native';

import { useColor } from '@/hooks/use-color';

export function LazyContainer({ children }: { children: React.ReactNode }) {
  
  const [isReady, setIsReady] = useState(false);
  const color = useColor();
  
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setIsReady(true));
    return () => task.cancel?.();
  }, []);
 
  return (
    <>
      {isReady ? (
        children
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={color.icon} />
        </View>
      )}
    </>
  );
}