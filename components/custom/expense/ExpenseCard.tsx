import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Card, CardDate, CardDescription, CardList, CardTitle } from '../containers/Card';

import { Expense } from '@/types/Expense';

import { useColor } from '@/hooks/use-color';


import { QuantityField } from '../QuantityField';


type ExpenseCardProps = {
  expense: Expense;
  startEditingItem: (itemName: string) => void;
};

export function ExpenseCard({ expense, startEditingItem }: ExpenseCardProps) {

  const color = useColor();

  function changeEditState() {
    startEditingItem(expense.id);
  }

  return (
    <Card>
      <CardTitle value={expense.title} />
      <CardDescription value={expense.description} />
      <CardDate value={expense.date} />
      <CardTitle value={expense.price.toString() + " €"} />
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
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
  },
});
