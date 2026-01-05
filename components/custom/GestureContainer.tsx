import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

type GestureContainerProps = {
  children: React.ReactNode;
  upAction?: () => void;
  downAction?: () => void;
  leftAction?: () => void;
  rightAction?: () => void;
};

export function GestureContainer({ children, upAction, downAction, leftAction, rightAction }: GestureContainerProps) {
  
  const onSwipe = (direction: string) => {
    switch (direction) {
      case 'SWIPE_UP':
        upAction?.();
        break;
      case 'SWIPE_DOWN':
        downAction?.();
        break;
      case 'SWIPE_LEFT':
        leftAction?.();
        break;
      case 'SWIPE_RIGHT':
        rightAction?.();
        break;
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      style={styles.overlay}
      onSwipe={onSwipe}
      config={config}
    >
      {children}
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderColor: 'red',
    borderWidth: 1,
  },
});