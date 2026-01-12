import React from 'react';

import { View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { getSalesInInterval } from '@/components/api/salesApi';
import { getExpensesInInterval } from '@/components/api/expensesApi';

import { getThisMonthRange } from '@/utils/dateUtils';

import { computeExpensesAmount, computeSalesAmount } from '@/utils/amountUtils';

export default function WeekSummary() {

  const color = useColor();

  const { firstDay, lastDay } = getThisMonthRange();

  const expenses = getExpensesInInterval(firstDay, lastDay);
  const sales = getSalesInInterval(firstDay, lastDay);

  const salesAmount = computeSalesAmount(sales);
  const expensesAmount = computeExpensesAmount(expenses);
  
  const thisWeekNumberOfSoldProducts = sales.reduce(
    (total, sale) =>
      total +
      sale.body.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'rgb(71, 95, 84)',
        }}
      >
        Mese corrente:
      </Text>
      <View style={{ padding: 10, width: 300, justifyContent: 'space-between' }}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <Text style={{ color: color.text, fontWeight: '800', fontSize: 25 }} >
            {thisWeekNumberOfSoldProducts}
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
  );
}