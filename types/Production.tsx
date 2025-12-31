
export type ProductionBodyItem = {
  product_id: string;
  quantity: number;
}

export type Production = {
  id: string;
  title: string;
  notes: string;
  body: ProductionBodyItem[],
  date: Date;
};

export const initProduction: Production = {
  id: '',
  title: '',
  notes: '',
  body: [],
  date: new Date(),
};