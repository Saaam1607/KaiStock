import React from 'react';
import { Text, TextProps } from 'react-native';

export default function MyText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'Jost' }, props.style]}
    />
  );
}
