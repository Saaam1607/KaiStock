import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import MyTextInput from './generic/MyTextInput';

import { useColor } from '@/hooks/use-color';

const firstInputDelay = 300;
const continuousInputDelay = 200;

const defaultIconSize = 30;
const IconSizeScaleIncrement = 1.15;
const IconSizeLarge = IconSizeScaleIncrement * defaultIconSize;

const iconAnimationDuration = 125; 

type QuantityEditorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export function QuantityEditor({
  quantity,
  setQuantity,
}: QuantityEditorProps) {

  const color = useColor();

  const [tmpQuantityText, setTmpQuantityText] = useState(quantity.toString());

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minusScale = useRef(new Animated.Value(1)).current;
  const plusScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setQuantity(tmpQuantityText === '' ? 0 : parseInt(tmpQuantityText, 10));
  }, [tmpQuantityText]);


function addQuantity(delta = 1) {
  setTmpQuantityText(prevText => {
    const actualQuantity = parseInt(prevText, 10);
    const newQuantity = isNaN(actualQuantity) ? delta : actualQuantity + delta;
    return newQuantity.toString();
  });
}

  function removeQuantity(delta = 1) {
    setTmpQuantityText(prevText => {
      const actualQuantity = parseInt(prevText, 10);
      const newQuantity = isNaN(actualQuantity) ? delta : actualQuantity - delta;
      return newQuantity.toString();
    });
  }

  function stopAll() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startAdding() {
    stopAll();

    addQuantity(1);
    animatePlus();

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        addQuantity(1);
        animatePlus();
      }, continuousInputDelay);
    }, firstInputDelay);
  }

  function startRemoving() {
    stopAll();

    removeQuantity(1);
    animateMinus();

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        removeQuantity(1);
        animateMinus();
      }, continuousInputDelay);
    }, firstInputDelay);
  }

  function animateMinus() {
    Animated.sequence([
      Animated.timing(minusScale, {
        toValue: IconSizeScaleIncrement,
        duration: iconAnimationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(minusScale, {
        toValue: 1,
        duration: iconAnimationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function animatePlus() {
    Animated.sequence([
      Animated.timing(plusScale, {
        toValue: IconSizeScaleIncrement,
        duration: iconAnimationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(plusScale, {
        toValue: 1,
        duration: iconAnimationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <View style={containerStyles.quantityButtons}>
      <Pressable
        style={[containerStyles.iconButtonView, containerStyles.iconButtonPressable, { borderColor: color.inputBorderColor }]}
        onPressIn={startRemoving}
        onPressOut={stopAll}
        onTouchCancel={stopAll}
      >
        <Animated.View style={{ transform: [{ scale: minusScale }] }}>
          <Ionicons
            name="remove-sharp"
            size={defaultIconSize}
            color={color.red}
          />
        </Animated.View>
      </Pressable>

      <View style={[containerStyles.quantity, { borderColor: color.inputBorderColor, borderWidth: 1 }]}>
        <MyTextInput
          style={[
            styles.input,
            { color: color.text }
          ]}
          maxLength={3}
          value={tmpQuantityText}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) { // solo numeri interi
              setTmpQuantityText(text);
            }
          }}
          keyboardType="decimal-pad"
      />
      </View>

      <Pressable
        style={[containerStyles.iconButtonView, containerStyles.iconButtonPressable, { borderColor: color.inputBorderColor }]}
        onPressIn={startAdding}
        onPressOut={stopAll}
        onTouchCancel={stopAll}
      >
        <Animated.View style={{ transform: [{ scale: plusScale }] }}>
          <Ionicons
            name="add-sharp"
            size={defaultIconSize}
            color={color.green}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const containerStyles = StyleSheet.create({
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    // justifyContent: 'space-between',
  },
  iconButtonView: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  iconButtonPressable: {
  },
  quantity: {
    // width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  }
});

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    fontSize: 15,
    width: 50,
    height: 40,
    textAlign: 'center',
  },
});