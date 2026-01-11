import React, { useEffect, useState } from 'react';

import { TrendMonthNavigationHeader, TrendYearNavigationHeader } from '../trends/TrendNavigationHeader';
import { CustomLineChart } from './CustomLineChart';


type TrendProps = {
  getYearData: (year: number) => number[];
  getMonthData: (year: number, month: number) => number[];
  getMonthLabels: () => string[];
  getDayLabels: (year: number, month: number) => string[];
  yearGraphLabel: string;
  monthGraphLabel: string;
};
export function Trend({ getYearData, getMonthData, getMonthLabels, getDayLabels, yearGraphLabel, monthGraphLabel }: TrendProps) {

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  }, []);

  function getData(mode: string) {
    switch (mode) {
      case 'year':
        return getYearData(currentYear);
      case 'month':
        return getMonthData(currentYear, currentMonth) ;
      default:
        return [];
    }
  };

  function getLabels(mode: string) {
    switch (mode) {
      case 'month':
        return getDayLabels(currentYear, currentMonth);
      case 'year':
        return getMonthLabels();
      default:
        return [];
    }
  };

  return (
    <>
      <TrendYearNavigationHeader
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
      <CustomLineChart
        title={yearGraphLabel}
        data={getData("year")}
        labels={getLabels("year")}
        graphColor='rgb(40, 98, 179)'
      />
      <TrendMonthNavigationHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
      <CustomLineChart
        title={monthGraphLabel}
        data={getData("month")}
        labels={getLabels("month")}
        graphColor='rgb(40, 98, 179)'
      />
    </>
  );
}