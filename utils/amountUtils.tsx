import type { Expense } from "@/types/Expense";
import type { Sale } from "@/types/Sale";

export function computeExpensesAmount(expenses: Expense[]) {
  return Math.round(expenses.reduce(
    (total, expense) => total + expense.price,
    0
  ));
}

export function computeSalesAmount(sales: Sale[]) {
  return Math.round(sales.reduce(
    (total, sale) =>
      total +
      sale.body.reduce((sum, item) => sum + item.quantity * item.unit_price * item.weight, 0),
    0
  ));
}