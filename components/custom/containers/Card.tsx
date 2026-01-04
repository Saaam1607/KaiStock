import React from 'react';
import { View, StyleSheet} from 'react-native';

import { useColor } from '@/hooks/use-color';

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {

  const color = useColor();

  return (
    <View style={[styles.shadowWrapper, { backgroundColor: color.cardBackground }]}>
      <View style={styles.card}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 25,
    margin: 3,
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12,
    overflow: 'hidden',
  }
});