import React from 'react';
import { View } from 'react-native';

type HeaderContainerProps = {
  children: React.ReactNode;
};

export function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
      }}
    >
      {children}
    </View>
  );
}