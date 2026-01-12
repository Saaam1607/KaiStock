import { sales } from '@/types/sales';

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