import { Dimensions } from 'react-native';

import type { Sale } from '@/types/Sale';

const { width, height } = Dimensions.get('window');
const diagonalInInches = Math.sqrt(width ** 2 + height ** 2) / 160;
const isSmallScreen = diagonalInInches < 7; 

function filterDayLabels(labels: string[]): string[] {
  const n = labels.length;
  if (n === 0) return [];

  const result = Array(n).fill('');
  result[0] = labels[0];

  const checkpoints = [5, 10, 15, 20, 25, n];
  checkpoints.forEach(day => {
    const idx = labels.indexOf(day.toString());
    if (idx !== -1) result[idx] = labels[idx];
  });

  return result;
};

export function getMonthDayLabels(year: number,month: number): string[] {
  const daysInMonth = new Date(1, month + 1, 0).getDate() // 1 = gennaio
  let res = [];
  for (let i = 0; i < daysInMonth; i++)
    res.push((i+1).toString())

  if (isSmallScreen)
    return filterDayLabels(res);
  else 
    return res;
}

export function getYearMonthLabels(): string[] {
  let res = [];
  for (let i = 0; i < 12; i++)
    res.push(new Date(1, i).toLocaleString('it', { month: 'short' }))
  return res;
}

export function getMonthlyCumulativeData( sales: Sale[], year: number, month: number ): number[] { 
  
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 = gennaio
  const dailyTotals = Array(daysInMonth).fill(0);

  for (const e of sales)
    if ( e.date.getFullYear() === year &&  e.date.getMonth() === month ) {
      const dayIndex = e.date.getDate() - 1;
      let amount = 0;
      e.body.map(item => amount += item.quantity * item.unit_price * item.weight);
      dailyTotals[dayIndex] += amount;
    }

  let cumulative = 0;
  return dailyTotals.map(dayAmount => {
    cumulative += dayAmount;
    return cumulative;
  });
}

export function getYearlyCumulativeData( sales: Sale[], year: number): number[] {
  
  const monthlyTotals = Array(12).fill(0);
  
  for (const e of sales)
    if (e.date.getFullYear() === year) {
      let amount = 0;
      e.body.map(item => amount += item.quantity * item.unit_price * item.weight);
      monthlyTotals[e.date.getMonth()] += amount;
    }

  let cumulative = 0;

  return monthlyTotals.map(monthAmount => {
    cumulative += monthAmount;
    return cumulative;
  });
}