import React from 'react';
import { View } from 'react-native';

import { useColor } from '@/hooks/use-color';

type SimpleCardProps = {
  children: React.ReactNode;
};

export default function SimpleCard({ children }: SimpleCardProps) {

  const color = useColor();

  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 8,
      backgroundColor: color.innerCardBackground,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: color.cardBorder
    }}>
      {children}
    </View>
  );
}