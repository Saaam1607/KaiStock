export type InventoryItem = {
  product_id: string;
  quantity: number;
};

export const initInventoryItem: InventoryItem = {
  product_id: '',
  quantity: 0,
};