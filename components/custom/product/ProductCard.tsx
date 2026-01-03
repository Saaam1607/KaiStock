import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Card } from '../containers/Card';

import { Product } from '@/types/Product';

import { useColor } from '@/hooks/use-color';


import { QuantityField } from '../QuantityField';

const bgCeladon     = 'rgb(172, 225, 175)';
const bgPeach        = 'rgb(255, 218, 185)';

type ProductCardProps = {
  product: Product;
  startEditingItem: (itemName: string) => void;
};

export function ProductCard({ product, startEditingItem }: ProductCardProps) {

  const color = useColor();

  function changeEditState() {
    startEditingItem(product.id);
  }

  return (
    <Card>
      <View
        style={[
          styles.cardStripe,
          { backgroundColor: product.total_quantity > product.reserved_quantity ? bgCeladon : bgPeach },
        ]}
      />

      <View style={styles.cardContent}>

        <View style={[styles.cardImage, { backgroundColor: color.cardImageBackground }]}>
          <Ionicons name="images" size={40} color={color.cardImage } />
        </View>

        <View style={styles.cardData}>
          <View>
            <Text style={[styles.name, { color: color.text }]}>{product.name}</Text>
            <Text style={[styles.description, { color: color.textLighter }]}>{product.description}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={[styles.price, { color: color.purple }]}>{product.price.toFixed(2)}</Text>
            <Text style={[styles.price, { color: color.purple, fontSize: 15 }]}>€/{product.uom}</Text>
          </View>

          <View>
            <Text style={[styles.name, { color: color.textLighter }]}>Quantità</Text>
            <View style={{ flexDirection: 'column', gap: 5, paddingHorizontal: 20 }}>
              <QuantityField
                label="In Magazzino"
                quantity={product.total_quantity}
              />
              <QuantityField
                label="Riservata"
                quantity={product.reserved_quantity}
              />
              <QuantityField
                label="Disponibile"
                quantity={product.total_quantity - product.reserved_quantity}
                colored={true}
              />
            </View>
          </View>
          
        </View>

        <View style={styles.cardButtons}>
          <TouchableHighlight onPress={changeEditState} underlayColor="transparent">
            <View style={[styles.buttonContainer, { backgroundColor: color.orange }]}>
              <Ionicons name="brush" size={20} />
            </View>
          </TouchableHighlight>
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
  },
  cardContent: {
    flexDirection: 'row',
    zIndex: 1,
    gap: 10,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardData: {
    flex: 1,
    gap: 10,
  },
  cardButtons: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
    color: '#841584',
  },
});
