import React, { useMemo } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { getAllSales } from '@/components/api/salesApi';

import { Trend } from '@/components/custom/trends/Trend';

import { getMonthDayLabels, getMonthlyCumulativeData, getYearlyCumulativeData, getYearMonthLabels } from '@/components/custom/sale/salesUtils';

export default function EarningsTrend() {
  
  const sales = getAllSales();

  const sortedSales = useMemo(() => {
    return [...sales].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [sales]);

  function getYearData(year: number): number[] {
    return getYearlyCumulativeData(sortedSales, year);
  }

  function getMonthData(year: number, month: number): number[] {
    return getMonthlyCumulativeData(sortedSales, year, month) ;
  }

  function getDayLabels(year: number, month: number): string[] {
    return getMonthDayLabels(year, month);
  }

  function getMonthLabels(): string[] {
    return getYearMonthLabels();
  }

  return (
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
  );
}