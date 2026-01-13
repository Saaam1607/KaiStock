import React, { useMemo } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { getAllSales } from '@/components/api/salesApi';
import { getAllExpenses } from '@/components/api/expensesApi';

import { GestureContainer } from '@/components/custom/GestureContainer';

import { Trend } from '@/components/custom/trends/Trend';

import { getMonthDayLabels, getMonthlyCumulativeData, getYearlyCumulativeData, getYearMonthLabels } from '@/components/custom/earning/earningsUtils';

export default function NetEarningsTrend() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const sales = getAllSales();
  const expenses = getAllExpenses();

  const sortedSales = useMemo(() => {
    return [...sales].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [sales]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [expenses]);


  function getYearData(year: number): number[] {
    return getYearlyCumulativeData(sortedSales, sortedExpenses, year);
  }

  function getMonthData(year: number, month: number): number[] {
    return getMonthlyCumulativeData(sortedSales, sortedExpenses, year, month) ;
  }

  function getDayLabels(year: number, month: number): string[] {
    return getMonthDayLabels(year, month);
  }

  function getMonthLabels(): string[] {
    return getYearMonthLabels();
  }

  return (
    <GestureContainer
      // leftAction={() => router.push('/(tabs)/warehouse/(products)/newProduct')}
      // rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Body */}
        <BodyContainer>
          <LazyContainer>
            <Trend
              getYearData={getYearData}
              getMonthData={getMonthData}
              getMonthLabels={getMonthLabels}
              getDayLabels={getDayLabels}
              yearGraphLabel={"Guadagno Cumulativo annuale"}
              monthGraphLabel={"Guadagno Cumulativo mensile"}
            />
          </LazyContainer>
        </BodyContainer>

      </PageContainer>
    </GestureContainer>
  );
}