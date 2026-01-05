import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { Product } from '@/types/Product';

import { FormItem } from '../form/FormItem';

import { useColor } from '@/hooks/use-color';

type ProductFormProps = {
  product: Product;
  setProduct: (product: Product) => void;
  showMandatoryBorders?: boolean;
  oldProduct?: Product | null;
};

export default function ProductForm({ product, setProduct, showMandatoryBorders = false, oldProduct }: ProductFormProps) {
  
  const color = useColor();

  const [priceText, setPriceText] = useState(product.price.toString());

  return (
    <View style={styles.form}>
      
      <FormItem
        label={"Nome *"}
        input={product.name}
        oldInput={oldProduct?.name}
        onInputChange={text => setProduct({ ...product, name: text })}
        showMandatoryBorders={showMandatoryBorders && product.name === ''}
      />

      <FormItem
        label="Descrizione"
        input={product.description}
        oldInput={oldProduct?.description}
        onInputChange={text => setProduct({ ...product, description: text })}
        inputStyle={{ height: 60 }}
        multiLine
      />

      <FormItem
        label="Prezzo"
        input={priceText}
        oldInput={oldProduct?.price?.toString()}
        onInputChange={text => {
          if (/^[0-9]*\.?[0-9]*$/.test(text)) { // consenti solo numeri e punto
            setPriceText(text);
            setProduct({
              ...product,
              price: text === '' ? 0 : Number(text),
            });
          }
        }}
        keyboardType="decimal-pad"
      />

      <FormItem
        label="Unità di misura"
        input={product.uom}
        oldInput={oldProduct?.uom}
        onInputChange={text => setProduct({ ...product, uom: text })}
      />

      <Text style={{ color: color.textLighter, marginTop: 20, fontSize: 12 }}>* Campo Obbligatorio </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
});
