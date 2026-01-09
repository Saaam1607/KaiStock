import { sales } from '@/types/sales';

export function getAllSales() {
  return sales;
}

export function getSaleFromId(id: string) {
  return sales.find((sale) => sale.id === id);
}