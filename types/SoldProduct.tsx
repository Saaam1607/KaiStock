export type SoldProduct = {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  uom: string;
  weight: number;
  paid: boolean;
  delivered: boolean;
}