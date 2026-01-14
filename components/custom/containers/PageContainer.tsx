import React from 'react';

import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

import { useColor } from '@/hooks/use-color';

import { LinearGradient } from 'expo-linear-gradient';

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  
  const color = useColor();
  
  const gradientColors: [string, string, ...string[]] = color.backGroundGradient.length >= 2
    ? (color.backGroundGradient as [string, string, ...string[]])
    : ['#fff', '#000'];

  return (
      <View style={{ flex: 1, gap: 20}}>
        <ThemedView
          style={{
            flex: 1,
            gap: 10,
          }}
        >
          <LinearGradient
            colors={gradientColors}
            style={{
              borderRadius: 5,
              height: '100%',
            }}>
              {children}
          </LinearGradient>
        </ThemedView>
      </View>
  );
}