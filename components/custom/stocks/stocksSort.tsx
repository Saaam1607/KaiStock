import type { Product } from '@/types/Product';

export function getSortedItemsToDisplay(items: Product[], sortKey: string, sortOrder: "asc" | "desc"): Product[] {
  
  let sortedItems = [...items];
  
  switch (sortKey) {
    case "name":
      sortedItems.sort((a: Product, b: Product) =>
        a.name.localeCompare(b.name),
      );
      break;
    default:
      break;
  }
  if (sortOrder === "desc") {
    sortedItems.reverse();
  }
  return sortedItems;
}