import { sales } from '@/types/sales';

import type { Sale } from '@/types/Sale';

export function getAllSales() {
  return sales;
}

export function getSalesInInterval(start: Date, end: Date) {
  return sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= start && saleDate <= end;
  });
}

export function getSaleFromId(id: string) {
  return sales.find((sale) => sale.id === id);
}

export async function editSale(sale: Sale) {
  const index = sales.findIndex((item) => item.id === sale.id);
  sales[index] = sale;
}

export async function deleteSale(id: string) {
  const index = sales.findIndex((item) => item.id === id);
  sales.splice(index, 1);
}