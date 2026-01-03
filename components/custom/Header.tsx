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
          size={30}
          color='rgba(106, 106, 106, 1)'
          onPress={leftIconPress || (() => {})}
        />
      )}
      <ThemedText type="title" style={styles.title}>{text}</ThemedText>
      {rightIconName && (
        <IconButton
          iconName={rightIconName}
          size={30}
          color='rgba(106, 106, 106, 1)'
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
  },
  title: {
    fontWeight: 'bold',
  },
});
