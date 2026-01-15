import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MyText from './generic/MyText';

import { useColor } from '@/hooks/use-color';

import Ionicons from '@expo/vector-icons/Ionicons';

type ButtonProps = {
  text: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export function Button({ text, onPress, iconName }: ButtonProps) {

  const color = useColor();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgb(46, 126, 90)',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: 225,
        height: 50,
        justifyContent: 'center',
      }}
    >
      {iconName && <Ionicons name={iconName} size={25} color={color.text} />}
      <MyText style={{ color: color.text }}>{text}</MyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
});

