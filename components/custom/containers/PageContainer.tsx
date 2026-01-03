import React from 'react';

import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <ThemedView
          style={{
            flex: 1,
            gap: 10,
          }}
        >
          {children}
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}