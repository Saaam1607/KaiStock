import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QuantityField } from '../QuantityField';
import { Product } from '@/types/Product';

const bgCeladon     = 'rgb(172, 225, 175)';
const bgPeach        = 'rgb(255, 218, 185)';

type ProductCardProps = {
  product: Product;
  startEditingItem: (itemName: string) => void;
};

export function ProductCard({ product, startEditingItem }: ProductCardProps) {

  function changeEditState() {
    startEditingItem(product.id);
  }

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.cardStripe,
          { backgroundColor: product.total_quantity > product.reserved_quantity ? bgCeladon : bgPeach },
        ]}
      />

      <View style={styles.cardContent}>
        <View style={styles.cardImage}>
          <Ionicons name="images" size={50} color="silver" />
        </View>

        <View style={styles.cardData}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={styles.price}>{product.price.toFixed(2)}</Text>
            <Text style={[styles.price, { fontSize: 15 }]}>€/{product.uom}</Text>
          </View>

          <View>
            <Text style={styles.name}>Quantità</Text>
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
            <View style={[styles.buttonContainer, { backgroundColor: 'orange' }]}>
              <Ionicons name="pencil" size={25} color="white" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 130,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
  },
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
    padding: 10,
    zIndex: 1,
    gap: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
