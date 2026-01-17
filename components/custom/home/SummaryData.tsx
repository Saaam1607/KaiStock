import React from 'react';

import { View, Text } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';

type SummaryDataProps = {
  title: string;
  numberOfSoldProducts: number;
  expensesAmount: number;
  salesAmount: number;
};

export default function SummaryData({ title, numberOfSoldProducts, expensesAmount, salesAmount }: SummaryDataProps) {

  const color = useColor();

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <MyText style={{ fontSize: 16, fontWeight: '600', color: 'rgb(71, 95, 84)' }} >
          {title}
        </MyText>
      </View>

      <View style={{ padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
        <View style={{ width: '100%'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <MyText style={{ color: color.text, fontSize: 14 }} >
              Prodotti venduti: 
            </MyText>
            <MyText style={{ color: color.text, fontWeight: '800', fontSize: 18 }} >
              {" "}{numberOfSoldProducts}
            </MyText>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            
            <MyText style={{ color: color.text, fontSize: 14 }} >
              Spese:
            </MyText>
            <MyText style={{ color: color.graphs.red, fontWeight: '800', fontSize: 18 }} >
              {" "}{expensesAmount} €
            </MyText>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <MyText style={{ color: color.text, fontSize: 14 }} >
              Entrate
            </MyText>
            <MyText style={{ color: color.graphs.green, fontWeight: '800', fontSize: 18 }} >
              {" "}{salesAmount} €
            </MyText>
          </View>
        </View>
      </View>
    </>
  );
}