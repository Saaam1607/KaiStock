import React from 'react';

import { StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import type { ProductQuantityItem } from '@/types/ProductQuantityItem';
import type { Reservation } from '@/types/Reservation';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardList, CardTitle } from '@/components/custom/containers/Card';

import { getProductFromId } from '@/components/api/productsApi';


type ReservationCardProps = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: ReservationCardProps) {
  
  const color = useColor();

  return (
    <Card>
      <CardTitle value={reservation.title} />
      <CardDescription value={reservation.notes} />
      <CardTitle value={reservation.to} />
      <CardDate value={reservation.date} />
      <CardList
        label="Prodotti"
        data={reservation.body as ProductQuantityItem[]}
        keyField="product_id"
        renderItem={({ item }) => {
          const product = getProductFromId(item.product_id);
          return (
            <>
              <View style={[styles.quantityBadge, { backgroundColor: color.cardItemDark }]}>
                <MyText style={[styles.quantityText, { color: color.text }]}>{item.quantity}</MyText>
              </View>
              <MyText style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                {product?.name}
              </MyText>
              <MyText style={[{ color: color.text }]} numberOfLines={1}>
                {product ? item.quantity * product.price : 0}
              </MyText>
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