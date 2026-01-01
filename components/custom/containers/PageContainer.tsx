import React from 'react';

import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <View
          style={{
            flex: 1,
            gap: 10,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}