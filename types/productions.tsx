import { Production } from "./Production";

export const productions: Production[] = [
  { id: '0',
    title: 'Produzione 1',
    notes: 'bla bla bla bla bla',
    body: [
      { id: '1', product_id: '1', quantity: 10, weight: 5.5 },
      { id: '2', product_id: '2', quantity: 20, weight: 10.0 },
    ],
    date: new Date(),
  },
  { id: '1',
    title: 'Produzione 2',
    notes: 'bla bla bla bla bla',
    body: [
      { id: '3', product_id: '1', quantity: 10, weight: 5.5 },
      { id: '4', product_id: '5', quantity: 20, weight: 15.0 },
    ],
    date: new Date(),
  },
  { id: '2',
    title: 'Produzione 3',
    notes: 'bla bla bla bla bla',
    body: [
      { id: '5', product_id: '3', quantity: 10, weight: 7.5 },
      { id: '6', product_id: '6', quantity: 20, weight: 12.0 },
    ],
    date: new Date(),
  },
];