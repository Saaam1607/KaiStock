import React from 'react';

import { View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';

type SummaryDataProps = {
  numberOfSoldProducts: number;
  expensesAmount: number;
  salesAmount: number;
};

export default function SummaryData({ numberOfSoldProducts, expensesAmount, salesAmount }: SummaryDataProps) {

  const color = useColor();

  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'rgb(71, 95, 84)',
        }}
      >
        Settimana corrente:
      </Text>
      <View style={{ padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
        <View style={{ width: 300 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{ color: color.text, fontWeight: '800', fontSize: 25 }} >
              {numberOfSoldProducts}
            </Text>
            <Text style={{ color: color.text, fontSize: 18 }} >
              Prodotti venduti
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Text style={{ color: color.red, fontWeight: '800', fontSize: 25,  }} >
              {expensesAmount} €
            </Text>
            <Text style={{ color: color.text, fontSize: 18 }} >
              Spese
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <Text style={{ color: color.green, fontWeight: '800', fontSize: 25 }} >
              {salesAmount} €
            </Text>
            <Text style={{ color: color.text, fontSize: 18 }} >
              Entrate
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}