import React from 'react';

import MyText from '../generic/MyText';

import type { Production } from '@/types/Production';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardList, CardTitle } from '@/components/custom/containers/Card';

import { getProductFromId } from '@/components/api/productsApi';

import SimpleCard from '../cards/SimpleCard';

type ProductionCardProps = {
  production: Production;
  startEditingItem: (itemName: string) => void;
  deleteItem?: (itemId: string, itemLabel: string) => void;
};

export default function ProductionCard({ production, startEditingItem, deleteItem }: ProductionCardProps) {
  
  const color = useColor();

  function handleEdit() {
    startEditingItem(production.id);
  }

  function handleDelete() {
    if (deleteItem) deleteItem(production.id, production.title);
  }

  return (
    <Card
      isEditable={true}
      editAction={handleEdit}
      isDeletable={true}
      deleteAction={handleDelete}
    >
      <CardTitle value={production.title} />
      <CardDescription value={production.notes} />
      <CardDate value={production.date} />
      <CardList
        label="Prodotti"
        data={production.body as ProductQuantityItem[]}
        keyField="id"
        renderItem={({ item }) => {
          const product = getProductFromId(item.id);
          return (
            <SimpleCard>
              <MyText style={{ fontWeight: 'bold', color: color.text }}>{product?.name}</MyText>
              <MyText style={{ color: color.textLighter }}>Peso: {item.weight} {product?.uom}</MyText>
              <MyText style={{ color: color.textLighter }}>Quantità: {item.quantity}</MyText>
            </SimpleCard>
          );
        }}
      />
    </Card>
  );
}