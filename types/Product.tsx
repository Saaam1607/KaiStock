export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  uom: string;
  total_quantity: number;
  reserved_quantity: number;
};

export const initProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  uom: '',
  total_quantity: 0,
  reserved_quantity: 0,
};