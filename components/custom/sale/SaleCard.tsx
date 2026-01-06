import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import type { Sale } from '@/types/Sale';
import type { Product } from '@/types/Product';
import type { SoldProduct } from '@/types/SoldProduct';

import { useColor } from '@/hooks/use-color';

import { Card, CardTitle, CardDescription, CardDate, CardList } from '@/components/custom/containers/Card';

import SaleTable from '@/components/custom/sale/SaleTable';

import { products } from '@/types/products';

type SaleTableRow = SoldProduct & {
  name: string;
  totalPrice: number;
};

type SaleCardProps = {
  sale: Sale;
};

export default function SaleCard({ sale }: SaleCardProps) {
  
  const color = useColor();
  const [tableData, setTableData] = useState<SaleTableRow[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const newTableData = sale.body.map((item: SoldProduct) => ({
      ...item,
      name: products.find((product) => product.id === item.product_id)?.name || 'N/A',
      totalPrice: item.quantity * item.unit_price * item.weight,
    }));
    setTableData(newTableData);
  }, [sale.body]);

  useEffect(() => {
    const newTotalPrice = tableData.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalPrice(newTotalPrice);
  }, [tableData]);



  function getProduct(product_id: string): Product | undefined {
    return products.find(item => item.id === product_id);
  }

  return (
    <Card>
      <CardTitle value={sale.title} />
      <CardTitle value={sale.to} />
      <CardDescription value={sale.notes} />
      <CardDate value={sale.date} />
      <View style={{ width: '100%' }}>
        <SaleTable data={tableData as SaleTableRow[]} />
      </View>
      <CardTitle value={'Totale: ' + totalPrice + ' €'} />
      {/* <CardList
        label="Prodotti"
        data={sale.body as SoldProduct[]}
        keyField="product_id"
        renderItem={({ item }) => {
          const product = getProduct(item.product_id);
          return (
            <View style={{ width: '100%', borderColor: 'blue', borderWidth: 1, flexDirection: 'row', gap: 10 }}>
              <View style={{ flexDirection: 'row', flexGrow: 1, gap: 10, borderColor: 'red', borderWidth: 1 }}>
                <View style={[styles.quantityBadge, { backgroundColor: color.cardItemDark }]}>
                  <Text style={[styles.quantityText, { color: color.text }]}>{item.quantity}</Text>
                </View>
                <Text style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                  {product?.name}
                </Text>
                <Text style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                  {'da ' + item.weight + ' ' + item.uom}
                </Text>
                <Text style={[styles.productName, { color: color.text }]} numberOfLines={1}>
                  {'a ' + item.unit_price + ' €/' + item.uom}
                </Text>
              </View>
                <Text style={[{ color: color.text }]} numberOfLines={1}>
                  {item.quantity * item.unit_price * item.weight}
                </Text>
            </View>
          );
        }}
      /> */}
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
    fontSize: 14,
  },
});