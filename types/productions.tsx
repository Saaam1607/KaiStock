import { Production } from "./Production";

export const productions: Production[] = [
  { id: '0',
    title: 'Produzione 1',
    notes: 'bla bla bla bla bla',
    body: [
      { product_id: '1', quantity: 10 },
      { product_id: '2', quantity: 20 },
    ],
    date: new Date(),
  },
  { id: '1',
    title: 'Produzione 2',
    notes: 'bla bla bla bla bla',
    body: [
      { product_id: '1', quantity: 10 },
      { product_id: '5', quantity: 20 },
    ],
    date: new Date(),
  },
  { id: '2',
    title: 'Produzione 3',
    notes: 'bla bla bla bla bla',
    body: [
      { product_id: '3', quantity: 10 },
      { product_id: '6', quantity: 20 },
    ],
    date: new Date(),
  },
];