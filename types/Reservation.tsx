import type { ProductQuantityItem } from './ProductQuantityItem';

export type Reservation = {
  id: string;
  title: string;
  notes: string;
  to: string;
  body: ProductQuantityItem[],
  date: Date;
};

export const initReservation: Reservation = {
  id: '',
  title: '',
  notes: '',
  to: '',
  body: [],
  date: new Date(),
};