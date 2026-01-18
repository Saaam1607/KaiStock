import type { Sale } from "./Sale";

import uuid from "react-native-uuid";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(year: number, month: number) {
  const day = randomInt(1, new Date(year, month + 1, 0).getDate());
  return new Date(year, month, day);
}

function randomSale(id: number, year: number, month: number): Sale {
  const numProducts = randomInt(1, 5); // 1-5 prodotti per vendita
  const body = Array.from({ length: numProducts }, () => ({
    id: uuid.v4().toString(),
    product_id: randomInt(1, 10).toString(),
    quantity: randomInt(1, 5),
    unit_price: randomInt(0.5, 5),
    uom: 'kg',
    weight: randomInt(0.5, 5),
  }));

  return {
    id: id.toString(),
    title: `Vendita ${id}`,
    notes: `Note vendita ${id}`,
    to: `Destinatario ${randomInt(1, 20)}`,
    body,
    date: randomDate(year, month),
    deltaDiscount: -randomInt(0, 5),
    delivered: Math.random() < 0.5,
    paid: Math.random() < 0.9,
  };
}

export const sales: Sale[] = [];

let saleId = 1;
for (let year = 2026; year <= 2027; year++) {
  for (let month = 0; month < 12; month++) {
    const salesCount = randomInt(5, 10);
    for (let i = 0; i < salesCount; i++) {
      sales.push(randomSale(saleId++, year, month));
    }
  }
}