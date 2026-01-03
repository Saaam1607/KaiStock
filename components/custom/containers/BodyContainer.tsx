import React from 'react';
import { View } from 'react-native';

type BodyContainerProps = {
  children: React.ReactNode;
};

export function BodyContainer({ children }: BodyContainerProps) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        flex: 1,
        gap: 10,
      }}
    >
      {children}
    </View>
  );
}