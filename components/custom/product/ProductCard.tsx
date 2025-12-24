import React from 'react';

import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { Product } from '@/types/Product';

import Ionicons from '@expo/vector-icons/Ionicons';


type ProductCardProps = {
  product: Product;
  startEditingItem: (itemName: string) => void;
};

export function ProductCard({ product, startEditingItem }: ProductCardProps) {

  function changeEditState() {
    startEditingItem(product.id);
  };

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
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>€ {product.price.toFixed(2)}</Text>
      </View>

      <View style={containerStyles.cardButtons}>
        <TouchableHighlight onPress={changeEditState} underlayColor="transparent">
          <View
            style={[
              containerStyles.buttonContainer,
              { backgroundColor: "orange" },
            ]}
          >
            <Ionicons
              name={"pencil"}
              size={25}
              color={"white"}
            />
          </View>
        </TouchableHighlight>   
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
  buttonContainer: {
    width: 50,
    height: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
});