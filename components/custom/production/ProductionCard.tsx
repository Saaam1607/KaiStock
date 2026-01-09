import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Production } from '@/types/Production';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardList, CardTitle } from '@/components/custom/containers/Card';

import { getProductFromId } from '@/components/api/productsApi';


type ProductionCardProps = {
  production: Production;
};

export default function ProductionCard({ production }: ProductionCardProps) {
  
  const color = useColor();

  return (
    <Card>
      <CardTitle value={production.title} />
      <CardDescription value={production.notes} />
      <CardDate value={production.date} />
      <CardList
        label="Prodotti"
        data={production.body as ProductQuantityItem[]}
        keyField="product_id"
        renderItem={({ item }) => {
          const product = getProductFromId(item.product_id);
          return (
            <>
              <View style={[styles.quantityBadge, { backgroundColor: color.cardItemDark }]}>
                <Text style={[styles.quantityText, { color: color.text }]}>{item.quantity}</Text>
              </View>
              <Text style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                {product?.name}
              </Text>
            </>
          );
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  quantityBadge: {
    minWidth: 32,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  quantityText: {
    fontWeight: '600',
    fontSize: 13,
  },
  productName: {
    flex: 1,
    fontSize: 14,
  },
});