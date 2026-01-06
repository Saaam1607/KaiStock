import type { Sale } from "./Sale";

export const sales: Sale[] = [
  {
    id: '1',
    title: 'Vendita 1',
    notes: 'Note 1',
    to: 'Destinatario 1',
    body: [
      { product_id: '1', quantity: 10, unit_price: 10, uom: 'kg', weight: 10 },
      { product_id: '2', quantity: 20, unit_price: 20, uom: 'kg', weight: 20 },
    ],
    date: new Date(),
    deltaDiscount: -1,
    delivered: false
  },
  {
    id: '2',
    title: 'Vendita 2',
    notes: 'Note 2',
    to: 'Destinatario 2',
    body: [
      { product_id: '1', quantity: 10, unit_price: 10, uom: 'kg', weight: 20 },
      { product_id: '2', quantity: 20, unit_price: 20, uom: 'kg', weight: 3 },
    ],
    date: new Date(),
    deltaDiscount: -3,
    delivered: true
  },
];