import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, useDerivedValue } from "react-native-reanimated";

import { LazyContainer } from "../containers/LazyContainer";

type FlipCardProps = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode[];
};

export default function FlipCard({ index, setIndex, children }: FlipCardProps) {

  const [cardWidth, setCardWidth] = useState(0);
  const rotate = useSharedValue(0);
  const isFlipping = useSharedValue(false);
  const swapped = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotateY: `${rotate.value}deg` }] }));

  const nextIndex = () => {
    setIndex((prev) => (prev + 1) % children.length);
  };

  const handleFlip = () => {
    if (isFlipping.value) return;

    isFlipping.value = true;
    const start = rotate.value;

    rotate.value = withTiming(
      start + 360,
      { duration: 1000 },
      () => {
        rotate.value = start;
        isFlipping.value = false;
      }
    );
  };

  useDerivedValue(() => {
    const angle = rotate.value % 180;

    if (angle > 90 && !swapped.value) {
      swapped.value = true;
      runOnJS(nextIndex)();
    }

    if (angle < 10) 
      swapped.value = false;
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: '100%' }}>
      <Pressable
        onPress={handleFlip}
        style={{ width: "100%" }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {  overflow: "hidden", backfaceVisibility: "hidden", width: '100%' },
          ]}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w !== cardWidth) setCardWidth(w);
          }}
        >
          <LazyContainer>
            {children[index]}
          </LazyContainer>
        </Animated.View>
      </Pressable>
    </View>
  );
}