import React, { useState } from 'react';

import { View } from 'react-native';
import MyText from '../generic/MyText';

import type { Product } from '@/types/Product';

import { FormItem } from '../form/FormItem';

import { useColor } from '@/hooks/use-color';

type ProductFormProps = {
  item: Product;
  setItem: React.Dispatch<React.SetStateAction<Product>>;
  showMandatoryBorders?: boolean;
  oldProduct?: Product | null;
};

export default function ProductForm({ item, setItem, showMandatoryBorders = false, oldProduct }: ProductFormProps) {
  
  const color = useColor();

  const [priceText, setPriceText] = useState(item.price.toString());

  return (
    <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
      
      <FormItem
        label={"Nome *"}
        input={item.name}
        oldInput={oldProduct?.name}
        onInputChange={text => setItem({ ...item, name: text })}
        showMandatoryBorders={showMandatoryBorders && item.name === ''}
      />

      <FormItem
        label="Descrizione"
        input={item.description}
        oldInput={oldProduct?.description}
        onInputChange={text => setItem({ ...item, description: text })}
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
            setItem({
              ...item,
              price: text === '' ? 0 : Number(text),
            });
          }
        }}
        keyboardType="decimal-pad"
      />

      <FormItem
        label="Unità di misura"
        input={item.uom}
        oldInput={oldProduct?.uom}
        onInputChange={text => setItem({ ...item, uom: text })}
      />

      <MyText style={{ color: color.textLighter, marginTop: 20, fontSize: 12 }}>* Campo Obbligatorio </MyText>
      
    </View>
  );
}