import type { Production } from '@/types/Production';

export function getSortedItemsToDisplay(items: Production[], sortKey: string, sortOrder: "asc" | "desc"): Production[] {
  
  let sortedItems = [...items];
  
  switch (sortKey) {
    case "date":
      sortedItems.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case "title":
      sortedItems.sort((a: Production, b: Production) =>
        a.title.localeCompare(b.title),
      );
      break;
    // case "price":
    //   sortedItems.sort((a: Production, b: Production) => a.price - b.price);
    //   break;
    default:
      break;
  }
  if (sortOrder === "desc") {
    sortedItems.reverse();
  }
  return sortedItems;
}