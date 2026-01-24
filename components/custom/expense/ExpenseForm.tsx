import React, { useState } from 'react';
import { View } from 'react-native';
import MyText from '../generic/MyText';

import type { Expense } from '@/types/Expense';

import { FormItem } from '../form/FormItem';
import { FormPrice } from '../form/FormPrice';
import { FormItemDate } from '../form/FromItemDate';

import { useColor } from '@/hooks/use-color';

type ExpenseFormProps = {
  item: Expense;
  setItem: (item: Expense) => void;
  showMandatoryBorders?: boolean;
  oldItem?: Expense | null;
};

export default function ExpenseForm({ item: expense, setItem: setExpense, showMandatoryBorders = false, oldItem: oldExpense }: ExpenseFormProps) {
  
  const color = useColor();

  return (
    <View style={{ width: '100%', gap: 10, marginTop: 10 }}>
      
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

      <FormPrice
        price={expense.price}
        setPrice={price => setExpense({ ...expense, price })}
        onInputChange={price => setExpense({ ...expense, price })}
        oldPrice={oldExpense?.price}
      />

      <MyText style={{ color: color.textLighter, marginTop: 20, fontSize: 12 }}>* Campo Obbligatorio </MyText>
      
    </View>
  );
}