import { Product } from "./Product";

export type Production = {
  id: string;
  title: string;
  notes: string;
  body: { product: Product, quantity: number }[],
  date: Date;
};

export const initProduction: Production = {
  id: '',
  title: '',
  notes: '',
  body: [],
  date: new Date(),
};