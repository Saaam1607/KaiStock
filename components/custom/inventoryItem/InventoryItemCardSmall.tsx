import React, { useState, useRef } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InventoryItem } from '@/types/InventoryItem';

import Ionicons from '@expo/vector-icons/Ionicons';

import { products } from '@/types/products';

type InventoryItemCardSmallProps = {
  inventoryItem: InventoryItem;
};

const firstInputDelay = 300;
const continuousInputDelay = 200;

export function InventoryItemCardSmall({ inventoryItem }: InventoryItemCardSmallProps) {

  const [deltaQuantity, setDeltaQuantity] = useState(0);
  const [inputDelay, setInputDelay] = useState(firstInputDelay);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const product = products.find(p => p.id === inventoryItem.product_id);



  function addQuantity(delta = 1) {
    setDeltaQuantity(q => q + delta);
  }

  function removeQuantity(delta = 1) {
    setDeltaQuantity(q => q - delta);
  }

  function startAdding() {
    addQuantity(1);
    intervalRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        addQuantity(1);
      }, continuousInputDelay);
    }, firstInputDelay);
  }

  function stopAdding() {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startRemoving() {
    removeQuantity(1);
    intervalRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        removeQuantity(1);
      }, continuousInputDelay);
    }, firstInputDelay);
  }

  function stopRemoving() {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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

        <Pressable
          onPressIn={startRemoving}
          onPressOut={stopRemoving}
        >
          <Ionicons
            name="remove-circle-sharp"
            size={60}
            color="red"
          />
        </Pressable>
        <Text style={styles.name}>
          {deltaQuantity >= 0 ? `+${Math.abs(deltaQuantity)}` : `-${Math.abs(deltaQuantity)}`}
        </Text>
        <Pressable
          onPressIn={startAdding}
          onPressOut={stopAdding}
        >
          <Ionicons
            name="add-circle-sharp"
            size={60}
            color="green"
          />
        </Pressable>

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
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
});