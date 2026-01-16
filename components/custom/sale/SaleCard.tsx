import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import MyText from '../generic/MyText';

import { LazyContainer } from '../containers/LazyContainer';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardTitle, CardPerson } from '@/components/custom/containers/Card';

import SaleTable from '@/components/custom/sale/SaleTable';

import { getProductFromId } from '@/components/api/productsApi';


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
      name: getProductFromId(item.product_id)?.name || 'N/A',
      totalPrice: item.quantity * item.unit_price * item.weight,
    }));
    setTableData(newTableData);
  }, [sale.body]);

  useEffect(() => {
    const newTotalPrice = tableData.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalPrice(newTotalPrice);
  }, [tableData]);

  return (
    <Card>
      <CardTitle value={sale.title} />
      <CardDescription value={sale.notes} />
      <CardPerson value={sale.to} />
      <CardDate value={sale.date} />
      <View style={{ width: '100%' }}>
        <LazyContainer>
          <FlatList
            data={tableData}
            keyExtractor={(item) => String(item.product_id + item.weight + item.unit_price)} // to fix
            style={{ gap: 4 }}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: color.cardBackground, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 }}>
                <View>
                  <MyText style={{ fontWeight: 'bold', color: color.text }}>{item.name}</MyText>
                  <MyText style={{ color: color.textLighter }}>Quantità: {item.quantity}</MyText>
                  <MyText style={{ color: color.textLighter }}>Prezzo unitario: {item.unit_price} €</MyText>
                  <MyText style={{ color: color.textLighter }}>Peso: {item.weight} {item.uom}</MyText>
                </View>
                <MyText style={{ fontWeight: 'bold', color: color.text }}>{item.totalPrice} €</MyText>
              </View>
            )}
          />
        </LazyContainer>
      </View>
      <CardTitle value={'Totale: ' + totalPrice + ' €'} />
    </Card>
  );
}