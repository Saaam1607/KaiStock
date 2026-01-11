import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { Expense } from '@/types/Expense';

import { FormItem } from '../form/FormItem';
import { FormItemDate } from '../form/FromItemDate';

import { useColor } from '@/hooks/use-color';

type ProductFormProps = {
  expense: Expense;
  setExpense: (expense: Expense) => void;
  showMandatoryBorders?: boolean;
  oldExpense?: Expense | null;
};

export default function ProductForm({ expense, setExpense, showMandatoryBorders = false, oldExpense }: ProductFormProps) {
  
  const color = useColor();

  const [priceText, setPriceText] = useState(expense.price.toString());

  return (
    <View style={styles.form}>
      
      <FormItem
        label={"Nome *"}
        input={expense.title}
        oldInput={oldExpense?.title}
        onInputChange={text => setExpense({ ...expense, title: text })}
        showMandatoryBorders={showMandatoryBorders && expense.title === ''}
      />

      <FormItem
        label="Descrizione"
        input={expense.description}
        oldInput={oldExpense?.description}
        onInputChange={text => setExpense({ ...expense, description: text })}
        inputStyle={{ height: 60 }}
        multiLine
      />
      
      <FormItemDate
        label="Data"
        input={expense.date}
        onInputChange={text => setExpense({ ...expense, date: text })}
      />

      <FormItem
        label="Prezzo"
        input={priceText}
        oldInput={oldExpense?.price?.toString()}
        onInputChange={text => {
          if (/^[0-9]*\.?[0-9]*$/.test(text)) { // consenti solo numeri e punto
            setPriceText(text);
            setExpense({
              ...expense,
              price: text === '' ? 0 : Number(text),
            });
          }
        }}
        keyboardType="decimal-pad"
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
