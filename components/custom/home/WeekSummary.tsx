import React from 'react';

import { View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { getSalesInInterval } from '@/components/api/salesApi';
import { getExpensesInInterval } from '@/components/api/expensesApi';

import { getThisWeekRange } from '@/utils/dateUtils';

import { computeExpensesAmount, computeSalesAmount } from '@/utils/amountUtils';
import { PieChart } from 'react-native-chart-kit';

import SummaryData from './SummaryData';
import SalesExpensesPieChart from './SalesExpensesPieChart';


export default function WeekSummary() {

  const color = useColor();

  const { monday, sunday } = getThisWeekRange();

  const expenses = getExpensesInInterval(monday, sunday);
  const sales = getSalesInInterval(monday, sunday);

  const salesAmount = computeSalesAmount(sales);
  const expensesAmount = computeExpensesAmount(expenses);
  
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
    <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
      
      <View style={{ flex: 1 }}>
        <SummaryData numberOfSoldProducts={numberOfSoldProducts} expensesAmount={expensesAmount} salesAmount={salesAmount} />
      </View>

      <SalesExpensesPieChart data={data} />

    </View>
  );
}