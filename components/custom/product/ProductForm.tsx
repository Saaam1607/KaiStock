import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Product } from '@/types/Product';

type ProductFormProps = {
  product: Product;
  setProduct: (product: Product) => void;
  oldProduct?: Product | null;
};

export default function ProductForm({ product, setProduct, oldProduct }: ProductFormProps) {
  
  const [priceText, setPriceText] = useState(product.price.toString());


  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[
          styles.input,
          oldProduct && oldProduct.name !== product.name && styles.inputChanged,
        ]}
        value={product.name}
        onChangeText={text => setProduct({ ...product, name: text })}
      />

      <Text style={styles.label}>Descrizione</Text>
      <TextInput
        style={[
          styles.input, 
          { height: 60 },
          oldProduct && oldProduct.description !== product.description && styles.inputChanged,
        ]}
        value={product.description}
        onChangeText={text => setProduct({ ...product, description: text })}
        multiline
      />

      <Text style={styles.label}>Prezzo</Text>
      <TextInput
        style={[
          styles.input,
          oldProduct && oldProduct.price !== Number(priceText) && styles.inputChanged,
        ]}
        value={priceText}
        onChangeText={(text) => {
          // consenti solo numeri e punto
          if (/^[0-9]*\.?[0-9]*$/.test(text)) {
            setPriceText(text);
            setProduct({
              ...product,
              price: text === '' ? 0 : Number(text),
            });
          }
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Unità di misura</Text>
      <TextInput
        style={[
          styles.input,
          oldProduct && oldProduct.uom !== product.uom && styles.inputChanged,
        ]}
        value={product.uom}
        onChangeText={text => setProduct({ ...product, uom: text })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
  },
  inputChanged: {
    borderColor: 'orange',
    borderWidth: 2,
  }
});
