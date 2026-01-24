import { Animated, Pressable } from 'react-native';

import { useRef } from 'react';
import { useColor } from '@/hooks/use-color';

const HOLD_DURATION = 1000;

type PressableCardProps = {
  children: React.ReactNode;
  onLongPressEnd: () => void;
};


export default function PressableCard({ children, onLongPressEnd }: PressableCardProps) {

  const color = useColor();

  const progress = useRef(new Animated.Value(0)).current;

  const startHold = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: HOLD_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onLongPressEnd();
      }
    });
  };

  const cancelHold = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [color.cardBackground, "rgb(61, 79, 111)"],
  });

  return (
    <Animated.View style={[ { backgroundColor, borderRadius: 20 }]}>
      <Pressable onPressIn={startHold} onPressOut={cancelHold}>
        {children}
      </Pressable>
    </Animated.View>
  );
}