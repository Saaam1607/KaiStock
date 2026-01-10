import type { Expense } from '@/types/Expense';

const expenses: Expense[] = [
  { id: '0', title: 'Spesa 1', description: 'bla bla bla bla bla', price: 10, date: new Date() },
  { id: '1', title: 'Spesa 2', description: 'bla bla bla bla bla', price: 21, date: new Date() },
  { id: '2', title: 'Spesa 3', description: 'bla bla bla bla bla', price: 42, date: new Date() },
  { id: '3', title: 'Spesa 4', description: 'bla bla bla bla bla', price: 63, date: new Date() },
  { id: '4', title: 'Spesa 5', description: 'bla bla bla bla bla', price: 84, date: new Date() },
  { id: '5', title: 'Spesa 6', description: 'bla bla bla bla bla', price: 105, date: new Date() },
];

export function getAllExpenses() {
  return expenses;
}

export function getExpenseFromId(id: string) {
  return expenses.find((expense) => expense.id === id);
}