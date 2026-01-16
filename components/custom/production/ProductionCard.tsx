import React from 'react';

import { StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.cardBackground, borderRadius: 25, paddingHorizontal: 5, paddingVertical: 5, gap: 10 }}>
              <View style={[styles.quantityBadge, { backgroundColor: color.cardBackground }]}>
                <MyText style={[styles.quantityText, { color: color.text }]}>{item.quantity}</MyText>
              </View>
              <MyText style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                {product?.name}
              </MyText>
            </View>
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
    borderRadius: 25,
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