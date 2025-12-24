export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  uom: string;
};

export const initProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  uom: '',
};