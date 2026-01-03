import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

import { useColor } from '@/hooks/use-color';

import IconButton from './IconButton';

type HeaderProps = {
  text: string;
  leftIconName?: string;
  leftIconPress?: () => void;
  rightIconName?: string;
  rightIconPress?: () => void;
};

export function Header({ text, leftIconName, leftIconPress, rightIconName, rightIconPress }: HeaderProps) {
  
  const color = useColor();
  
  return (
    <View
      style={[
        styles.titleContainer,
        leftIconName && rightIconName ? { justifyContent: 'space-between' } : { justifyContent: 'center',},
      ]}
    >
      {leftIconName && (
        <IconButton
          iconName={leftIconName}
          size={30}
          color={color.icon}
          onPress={leftIconPress || (() => {})}
        />
      )}
      <ThemedText type="title" style={[styles.title, { color: color.text }]}>{text}</ThemedText>
      {rightIconName && (
        <IconButton
          iconName={rightIconName}
          size={30}
          color={color.icon}
          onPress={rightIconPress || (() => {})}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});