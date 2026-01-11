import type { Expense } from '@/types/Expense';

export function getMonthDayLabels(year: number,month: number): string[] {
  const daysInMonth = new Date(1, month + 1, 0).getDate() // 1 = gennaio
  let res = [];
  for (let i = 0; i < daysInMonth; i++)
    res.push((i+1).toString())
  return res;
}

export function getYearMonthLabels(): string[] {
  let res = [];
  for (let i = 0; i < 12; i++)
    res.push(new Date(1, i).toLocaleString('it', { month: 'short' }))
  return res;
}

export function getMonthlyCumulativeData( expenses: Expense[], year: number, month: number ): number[] { 
  
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 = gennaio
  const dailyTotals = Array(daysInMonth).fill(0);

  for (const e of expenses)
    if ( e.date.getFullYear() === year &&  e.date.getMonth() === month ) {
      const dayIndex = e.date.getDate() - 1;
      dailyTotals[dayIndex] += e.price;
    }

  let cumulative = 0;
  return dailyTotals.map(dayAmount => {
    cumulative += dayAmount;
    return cumulative;
  });
}

export function getYearlyCumulativeData( expenses: Expense[], year: number): number[] {
  
  const monthlyTotals = Array(12).fill(0);
  
  for (const e of expenses)
    if (e.date.getFullYear() === year) {
      monthlyTotals[e.date.getMonth()] += e.price;
    }

  let cumulative = 0;

  return monthlyTotals.map(monthAmount => {
    cumulative += monthAmount;
    return cumulative;
  });
}