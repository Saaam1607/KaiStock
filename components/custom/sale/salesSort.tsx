import type { Sale } from '@/types/Sale';

export function getSortedItemsToDisplay(items: Sale[], sortKey: string, sortOrder: "asc" | "desc"): Sale[] {
  
  let sortedItems = [...items];
  
  switch (sortKey) {
    case "date":
      sortedItems.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case "title":
      sortedItems.sort((a: Sale, b: Sale) =>
        a.title.localeCompare(b.title),
      );
      break;
    // case "price":
    //   sortedItems.sort((a: Sale, b: Sale) => a.price - b.price);
    //   break;
    default:
      break;
  }
  if (sortOrder === "desc") {
    sortedItems.reverse();
  }
  return sortedItems;
}