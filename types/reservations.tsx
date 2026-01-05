import { Reservation } from "./Reservation";

export const reservations: Reservation[] = [
  { id: '0',
    title: 'Riservato 1',
    notes: 'bla bla bla bla bla',
    to: "Babbo",
    body: [
      { product_id: '1', quantity: 10 },
      { product_id: '2', quantity: 20 },
    ],
    date: new Date(),
  },
  { id: '1',
    title: 'Riservato 2',
    notes: 'bla bla bla bla bla',
    to: "Cuggino",
    body: [
      { product_id: '1', quantity: 10 },
      { product_id: '5', quantity: 20 },
    ],
    date: new Date(),
  },
  { id: '2',
    title: 'Riservato 3',
    notes: 'bla bla bla bla bla',
    to: "Cenone Natale",
    body: [
      { product_id: '3', quantity: 10 },
      { product_id: '6', quantity: 20 },
    ],
    date: new Date(),
  },
];