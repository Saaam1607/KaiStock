export type Expense = {
  id: string;
  title: string;
  description: string;
  price: number;
  date: Date;
};

export const initExpense: Expense = {
  id: '',
  title: '',
  description: '',
  price: 0,
  date: new Date(),
};