import type { Expense } from '@/types/Expense';

import uuid from 'react-native-uuid';


function randomDateInMonth(year: number, month: number): Date {
  const day = Math.floor(Math.random() * 28) + 1; // evitiamo problemi
  return new Date(year, month, day);
}

function generateExpensesForTwoYears(
  startYear: number
): Expense[] {
  const expenses: Expense[] = [];
  let idCounter = 0;

  for (let year = startYear; year <= startYear + 1; year++) {
    for (let month = 0; month < 12; month++) {
      const expensesInMonth =
        Math.floor(Math.random() * 16) + 5; // 5–20

      for (let i = 0; i < expensesInMonth; i++) {
        expenses.push({
          id: String(idCounter++),
          title: `Spesa ${idCounter}`,
          description: 'bla bla bla bla bla',
          price: Math.floor(Math.random() * 90) + 10, // 10–100 €
          date: randomDateInMonth(year, month),
        });
      }
    }
  }

  return expenses;
}

const expenses: Expense[] = generateExpensesForTwoYears(2026);


export function getAllExpenses() {
  return expenses;
}

export function getExpenseFromId(id: string) {
  return expenses.find((expense) => expense.id === id);
}

export async function createExpense(expense: Expense) {
  expense.id = uuid.v4().toString();
  expenses.push(expense);
}

export async function editExpense(expense: Expense) {
  const index = expenses.findIndex((item) => item.id === expense.id);
  expenses[index] = expense;
}

export async function deleteExpense(id: string) {
  const index = expenses.findIndex((item) => item.id === id);
  expenses.splice(index, 1);
}