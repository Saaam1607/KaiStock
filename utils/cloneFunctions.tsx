import uuid from "react-native-uuid";

import type { Production } from "@/types/Production";
import type { Sale } from "@/types/Sale";

type WithId = {
  id: string;
};

export function cloneItem<T extends WithId>(  items: T[], idToClone: string ): T[] {
  const index = items.findIndex((item) => item.id === idToClone);
  if (index === -1) return items;

  const clonedItem: T = {
    ...items[index],
    id: uuid.v4().toString(),
  };

  const result = [...items];
  result.splice(index + 1, 0, clonedItem);

  return result;
}

export function cloneProductionItem( idToClone: string, setProduction: React.Dispatch<React.SetStateAction<Production>> ) {
  setProduction((prev) => ({
    ...prev,
    body: cloneItem(prev.body, idToClone),
  }));
}

export function cloneSaleItem( idToClone: string, setSale: React.Dispatch<React.SetStateAction<Sale>> ) {
  setSale((prev) => ({
    ...prev,
    body: cloneItem(prev.body, idToClone),
  }));
}