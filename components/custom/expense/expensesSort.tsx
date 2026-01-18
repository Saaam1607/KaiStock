import type { Expense } from '@/types/Expense';

export function getSortedItemsToDisplay(items: Expense[], sortKey: string, sortOrder: "asc" | "desc"): Expense[] {
  
  let sortedItems = [...items];
  
  switch (sortKey) {
    case "date":
      sortedItems.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case "title":
      sortedItems.sort((a: Expense, b: Expense) =>
        a.title.localeCompare(b.title),
      );
      break;
    case "price":
      sortedItems.sort((a: Expense, b: Expense) => a.price - b.price);
      break;
    default:
      break;
  }
  if (sortOrder === "desc") {
    sortedItems.reverse();
  }
  return sortedItems;
}