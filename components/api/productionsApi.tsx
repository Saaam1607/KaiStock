import { productions } from '@/types/productions';

export function getAllProductions() {
  return productions;
}

export function getProductionFromId(id: string) {
  return productions.find((production) => production.id === id);
}
