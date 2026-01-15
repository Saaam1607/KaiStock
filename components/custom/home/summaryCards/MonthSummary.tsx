import React from 'react';

import { View } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { getSalesInInterval } from '@/components/api/salesApi';
import { getExpensesInInterval } from '@/components/api/expensesApi';

import { getThisMonthRange } from '@/utils/dateUtils';

import { computeExpensesAmount, computeSalesAmount } from '@/utils/amountUtils';
import SummaryData from '../SummaryData';
import SalesExpensesPieChart from '../SalesExpensesPieChart';

import { useWindowDimensions } from 'react-native';


export default function WeekSummary() {

  const color = useColor();

  const { firstDay, lastDay } = getThisMonthRange();

  const expenses = getExpensesInInterval(firstDay, lastDay);
  const sales = getSalesInInterval(firstDay, lastDay);

  const salesAmount = computeSalesAmount(sales);
  const expensesAmount = computeExpensesAmount(expenses);

  const { width } = useWindowDimensions();
  
  const numberOfSoldProducts = sales.reduce(
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
    <View style={{ borderRadius: 30, backgroundColor: 'rgba(0, 0, 0, 0.25)', flexDirection: 'row', gap: 10, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <SummaryData title={"Mese corrente"} numberOfSoldProducts={numberOfSoldProducts} expensesAmount={expensesAmount} salesAmount={salesAmount} />
      </View>
      <View style={{ justifyContent: 'center' }}>
        <SalesExpensesPieChart data={data} />
      </View>
    </View>
  );
}