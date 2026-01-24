import React, { useState } from 'react';

import { FormItem } from './FormItem';

type FormPriceProps = {
  price: number;
  setPrice: (price: number) => void;
  onInputChange?: (price: number) => void;
  oldPrice?: number;
};

export function FormPrice({ price, setPrice, oldPrice }: FormPriceProps) {

  const [priceText, setPriceText] = useState(price.toString());

  return (
    <FormItem
      label="Prezzo"
      input={priceText}
      oldInput={oldPrice?.toString()}
      onInputChange={text => {
        if (/^[0-9]*\.?[0-9]*$/.test(text)) { // consenti solo numeri e punto
          setPriceText(text);
          const number = text === '' ? 0 : Number(text);
          setPrice(number);
        }
      }}
      keyboardType="decimal-pad"
    />
  );
}