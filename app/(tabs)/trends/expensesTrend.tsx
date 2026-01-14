import React, { useMemo } from 'react';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { getAllExpenses } from '@/components/api/expensesApi';

import { Trend } from '@/components/custom/trends/Trend';

import { getMonthDayLabels, getMonthlyCumulativeData, getYearlyCumulativeData, getYearMonthLabels } from '@/components/custom/expense/expensesUtils';

export default function ExpensesTrend() {
  
  const expenses = getAllExpenses();

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [expenses]);

  function getYearData(year: number): number[] {
    return getYearlyCumulativeData(sortedExpenses, year);
  }

  function getMonthData(year: number, month: number): number[] {
    return getMonthlyCumulativeData(sortedExpenses, year, month) ;
  }

  function getDayLabels(year: number, month: number): string[] {
    return getMonthDayLabels(year, month);
  }

  function getMonthLabels(): string[] {
    return getYearMonthLabels();
  }

  return (
    <PageContainer>
      <BodyContainer>
        <LazyContainer>
          <Trend
            getYearData={getYearData}
            getMonthData={getMonthData}
            getMonthLabels={getMonthLabels}
            getDayLabels={getDayLabels}
            yearGraphLabel={"Spesa Cumulativa annuale"}
            monthGraphLabel={"Spesa Cumulativa mensile"}
          />
        </LazyContainer>
      </BodyContainer>

    </PageContainer>
  );
}