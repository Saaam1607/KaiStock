import React from 'react';

import { StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Card } from '../containers/Card';

import { Product } from '@/types/Product';

import { useColor } from '@/hooks/use-color';


import { QuantityField } from '../QuantityField';

type ProductCardProps = {
  product: Product;
  startEditingItem: (itemName: string) => void;
  deleteItem?: (itemId: string, itemLabel: string) => void;
};

export function ProductCard({ product, startEditingItem, deleteItem }: ProductCardProps) {

  const color = useColor();

  function handleEdit() {
    startEditingItem(product.id);
  }

  function handleDelete() {
    if (deleteItem) deleteItem(product.id, product.name);
  }

  return (
    <Card
      isEditable={true}
      editAction={handleEdit}
      isDeletable={true}
      deleteAction={handleDelete}
    >
      <View
        style={[
          styles.cardStripe,
          // { backgroundColor: product.total_quantity > product.reserved_quantity ? color.green : color.peach },
        ]}
      />

      <View style={styles.cardContent}>

        <View style={[styles.cardImage, { backgroundColor: color.cardImageBackground }]}>
          <Ionicons name="image-outline" size={40} color={color.cardImage} />
        </View>

        <View style={styles.cardData}>
          <View>
            <MyText style={[styles.name, { color: color.text }]}>{product.name}</MyText>
            <MyText style={[styles.description, { color: color.textLighter }]}>{product.description}</MyText>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <MyText style={[styles.price, { color: color.purple }]}>{product.price.toFixed(2)}</MyText>
            <MyText style={[styles.price, { color: color.purple, fontSize: 15 }]}>€/{product.uom}</MyText>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardStripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 60,
    zIndex: 0,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    zIndex: 1,
    gap: 20,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardData: {
    flex: 1,
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
  },
});
