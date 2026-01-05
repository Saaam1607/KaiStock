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
        paddingVertical: 20,
        flex: 1,
        gap: 20,
      }}
    >
      {children}
    </View>
  );
}