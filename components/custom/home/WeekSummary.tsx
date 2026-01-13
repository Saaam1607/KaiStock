import React from 'react';

import { View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { getSalesInInterval } from '@/components/api/salesApi';
import { getExpensesInInterval } from '@/components/api/expensesApi';

import { getThisWeekRange } from '@/utils/dateUtils';

import { computeExpensesAmount, computeSalesAmount } from '@/utils/amountUtils';
import { PieChart } from 'react-native-chart-kit';


export default function WeekSummary() {

  const color = useColor();

  const { monday, sunday } = getThisWeekRange();

  const expenses = getExpensesInInterval(monday, sunday);
  const sales = getSalesInInterval(monday, sunday);

  const salesAmount = computeSalesAmount(sales);
  const expensesAmount = computeExpensesAmount(expenses);
  
  const thisWeekNumberOfSoldProducts = sales.reduce(
    (total, sale) =>
      total +
      sale.body.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  const data = [
    { amount: salesAmount, color: color.green },
    { amount: expensesAmount, color: color.red },
  ];

  return (
    <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
      
      <View style={{ flex: 1 }}>
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
      </View>

      <View style={{ }}>
        <PieChart
          data={data}
          width={200}
          height={200}
          hasLegend={false}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[50, 0]}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>

    </View>
  );
}