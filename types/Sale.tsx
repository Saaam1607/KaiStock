import type { SoldProduct } from './SoldProduct';

export type Sale = {
  id: string;
  title: string;
  notes: string;
  to: string;
  body: SoldProduct[],
  date: Date;
  deltaDiscount: number;
  delivered: boolean;
  paid: boolean;
};

export const initSale: Sale = {
  id: '',
  title: '',
  notes: '',
  to: '',
  body: [],
  date: new Date(),
  deltaDiscount: 0,
  delivered: false,
  paid: false
};