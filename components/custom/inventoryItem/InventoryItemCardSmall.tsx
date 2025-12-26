import React, { useRef, useState } from 'react';

import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { InventoryItem } from '@/types/InventoryItem';

import Ionicons from '@expo/vector-icons/Ionicons';

import { products } from '@/types/products';

type InventoryItemCardSmallProps = {
  inventoryItem: InventoryItem;
};

const firstInputDelay = 300;
const continuousInputDelay = 200;

const defaultIconSize = 60;
const IconSizeScaleIncrement = 1.25;
const IconSizeLarge = IconSizeScaleIncrement * defaultIconSize;

const iconAnimationDuration = 100; 

export function InventoryItemCardSmall({ inventoryItem }: InventoryItemCardSmallProps) {

  const [deltaQuantity, setDeltaQuantity] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minusScale = useRef(new Animated.Value(1)).current;
  const plusScale = useRef(new Animated.Value(1)).current;


  const product = products.find(p => p.id === inventoryItem.product_id);

  function addQuantity(delta = 1) {
    setDeltaQuantity(q => q + delta);
  }

  function removeQuantity(delta = 1) {
    setDeltaQuantity(q => q - delta);
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
    <View
      style={[
        containerStyles.card,
      ]}
    >
      <View style={containerStyles.cardImage}>
        <Ionicons name={"images"} size={50} color="silver" />
      </View>

      <View style={containerStyles.cardData}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.quantity_small}>Quantità precedente: {inventoryItem.quantity}</Text>
        <Text style={styles.quantity_small}>Quantità aggiornata: {inventoryItem.quantity + deltaQuantity}</Text>
      </View>

      <View style={containerStyles.quantityButtons}>
        <View style={containerStyles.iconButtonView}>
          <Pressable
            style={containerStyles.iconButtonPressable}
            onPressIn={startRemoving}
            onPressOut={stopAll}
            onTouchCancel={stopAll}
          >
            <Animated.View style={{ transform: [{ scale: minusScale }] }}>
              <Ionicons
                name="remove-circle-sharp"
                size={defaultIconSize}
                color="red"
              />
            </Animated.View>
          </Pressable>
        </View>

        <View style={containerStyles.quantity}>
          <Text
            style={[
              styles.delta_quantity,
              deltaQuantity > 0 && styles.green,
              deltaQuantity < 0 && styles.red,
            ]}
          >
            {deltaQuantity >= 0 ? `+${Math.abs(deltaQuantity)}` : `-${Math.abs(deltaQuantity)}`}
          </Text>
        </View>

        <View style={containerStyles.iconButtonView}>
          <Pressable
            style={containerStyles.iconButtonPressable}
            onPressIn={startAdding}
            onPressOut={stopAll}
            onTouchCancel={stopAll}
          >
            <Animated.View style={{ transform: [{ scale: plusScale }] }}>
              <Ionicons
                name="add-circle-sharp"
                size={defaultIconSize}
                color="green"
              />
            </Animated.View>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const containerStyles = StyleSheet.create({
  card: {
    minHeight: 130,
    backgroundColor: 'rgba(240, 240, 240, 1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  cardData: {
    flex: 1,
  },
  cardButtons: {
    height: '100%',
    gap: 10,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonView: {
    width: IconSizeLarge,
    height: IconSizeLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPressable: {
  },
  quantity: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#841584',
  },
  quantity: {
    fontSize: 25,
    fontWeight: '700',
  },
  quantity_small: {
  },
  delta_quantity: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  }

});