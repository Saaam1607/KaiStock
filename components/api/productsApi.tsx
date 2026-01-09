import type { Product } from '@/types/Product';

import { products } from '@/types/products';

export function getAllProducts() {
  return products;
}

export function getProductFromId(id: string) {
  return products.find((product) => product.id === id);
}

export function createProduct(product: Product) {
  
}
