import type { Production } from '@/types/Production';

import { productions } from '@/types/productions';

export function getAllProductions() {
  return productions;
}

export function getProductionFromId(id: string) {
  return productions.find((production) => production.id === id);
}

export async function editProduction(production: Production) {
  const index = productions.findIndex((item) => item.id === production.id);
  productions[index] = production;
}

export async function deleteProduction(id: string) {
  const index = productions.findIndex((item) => item.id === id);
  productions.splice(index, 1);
}
