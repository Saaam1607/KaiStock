import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

import IconButton from './IconButton';

type HeaderProps = {
  text: string;
  leftIconName?: string;
  leftIconPress?: () => void;
  rightIconName?: string;
  rightIconPress?: () => void;
};

export function Header({ text, leftIconName, leftIconPress, rightIconName, rightIconPress }: HeaderProps) {
  return (
    <ThemedView
      style={[
        styles.titleContainer,
        leftIconName && rightIconName ? { justifyContent: 'space-between' } : { justifyContent: 'center',},
        
      ]}
    >
      {leftIconName && (
        <IconButton
          iconName={leftIconName}
          size={50}
          onPress={leftIconPress || (() => {})}
        />
      )}
      <ThemedText type="title" style={styles.title}>{text}</ThemedText>
      {rightIconName && (
        <IconButton
          iconName={rightIconName}
          size={50}
          onPress={rightIconPress || (() => {})}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
   titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    height: 70,
  },
  title: {
    fontWeight: 'bold',
  },
});
