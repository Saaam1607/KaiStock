import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import type { Production } from '@/types/Production';
import type { Product } from '@/types/Product';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import { useColor } from '@/hooks/use-color';

import { Card, CardTitle, CardDescription, CardDate, CardList } from '@/components/custom/containers/Card';

import { getProduct } from '@/components/utils/getProduct';

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
          const product = getProduct(item.product_id);
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