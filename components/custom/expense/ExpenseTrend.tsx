import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';

import { getAllExpenses } from '@/components/api/expensesApi';
import type { Expense } from '@/types/Expense';

import { TrendModeSelector } from '../trends/TrendModeSelector';
import { TrendNavigationHeader } from '../trends/TrendNavigationHeader';

import { useColor } from '@/hooks/use-color';

import { getMonthDayLabels, getYearMonthLabels, getMonthlyCumulativeData, getYearlyCumulativeData } from './expensesUtils';

import { LineChart } from "react-native-chart-kit";

import { LazyContainer } from '../containers/LazyContainer';

type TrendMode = 'year' | 'month';

export function ExpenseTrend() {

  const color = useColor();
  const expenses = getAllExpenses();

  const [mode, setMode] = useState<TrendMode>('month');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const now = new Date();
    if (mode === 'year') setCurrentYear(now.getFullYear());
    if (mode === 'month') {
      setCurrentYear(now.getFullYear());
      setCurrentMonth(now.getMonth());
    }
  }, [mode]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [expenses]);

  const getData: number[] = useMemo(() => {
    switch (mode) {
      case 'year':
        return getYearlyCumulativeData(sortedExpenses, currentYear);
      case 'month':
        return getMonthlyCumulativeData(sortedExpenses, currentYear, currentMonth) ;
      default:
        return [];
    }
  }, [mode, sortedExpenses, currentYear, currentMonth]);

  const getLabels: string[] = useMemo(() => {
    switch (mode) {
      case 'year':
        return getMonthDayLabels(currentYear, currentMonth);
      case 'month':
        return getYearMonthLabels();
      default:
        return [];
    }
  }, [mode, sortedExpenses, currentYear, currentMonth]);

  return (
    <>
      <TrendModeSelector mode={mode} setMode={setMode} />

      <TrendNavigationHeader
        mode={mode}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <View
        style={{ alignItems: 'center' }}
      >
        
        <LineChart
          data={{
            labels: getLabels,
            datasets: [{ data: getData }],
            legend: ["Spesa Cumulativa"] 
          }}
          width={Dimensions.get("window").width - 20}
          height={300}
          yAxisLabel=""
          fromZero
          withVerticalLines={false}          
          yAxisSuffix=" €"
          segments={5}
          yAxisInterval={100}
          yLabelsOffset={15}
          chartConfig={{
            backgroundGradientFrom: color.background,
            backgroundGradientTo: color.background,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgb(40, 98, 179)`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              borderColor: 'red',
              borderWidth: 3,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "3",
              stroke: "#31b5cc"
            }
          }}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 20
          }}
        />
      </View>
    </>
  );
}
