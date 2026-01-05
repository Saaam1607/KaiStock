import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import type { Reservation } from '@/types/Reservation';
import type { Product } from '@/types/Product';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import { useColor } from '@/hooks/use-color';

import { Card, CardTitle, CardDescription, CardDate, CardList } from '@/components/custom/containers/Card';

import { products } from '@/types/products';

type ReservationCardProps = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: ReservationCardProps) {
  
  const color = useColor();
  
  function getProduct(product_id: string): Product | undefined {
    return products.find(item => item.id === product_id);
  }

  return (
    <Card>
      <CardTitle value={reservation.title} />
      <CardTitle value={reservation.to} />
      <CardDescription value={reservation.notes} />
      <CardDate value={reservation.date} />
      <CardList
        label="Prodotti"
        data={reservation.body as ProductQuantityItem[]}
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