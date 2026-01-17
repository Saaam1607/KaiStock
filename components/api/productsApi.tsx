import type { Product } from '@/types/Product';

import { products } from '@/types/products';

import { getAllProductions } from './productionsApi';
import { getAllReservations } from './reservationsApi';

export function getAllProducts() {
  return products;
}

export function getProductFromId(id: string) {
  return products.find((product) => product.id === id);
}

export function createProduct(product: Product) {
  
}

export function getProductsInStock(id: string) {
  const productions = getAllProductions();
  let amountInStock = 0;
  if (productions) {
    productions.forEach((production) => {
      production.body.forEach((item) => {
        if (item.product_id === id) {
          amountInStock += item.quantity;
        }
      });
    });
  }
  return amountInStock;
}

export function getReservedProducts(id: string) {
  const reservations = getAllReservations();
  let reservedAmount = 0;
  if (reservations) {
    reservations.forEach((reservation) => {
      reservation.body.forEach((item) => {
        if (item.product_id === id) {
          reservedAmount += item.quantity;
        }
      });
    });
  }
  return reservedAmount;
}
