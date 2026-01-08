import { products } from '@/types/products';

export function getProduct(id: string) {
    return products.find((product) => product.id === id);
}