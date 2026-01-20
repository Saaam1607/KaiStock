import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import MyText from '../generic/MyText';

import { LazyContainer } from '../containers/LazyContainer';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardTitle, CardPerson } from '@/components/custom/containers/Card';

import { getProductFromId } from '@/components/api/productsApi';

import SimpleCard from '../cards/SimpleCard';

type SaleTableRow = SoldProduct & {
  name: string;
  totalPrice: number;
};

type SaleCardProps = {
  sale: Sale;
  startEditingItem: (itemName: string) => void;
  deleteItem?: (itemId: string, itemLabel: string) => void;
};

export default function SaleCard({ sale, startEditingItem, deleteItem }: SaleCardProps) {
  
  const color = useColor();

  function handleEdit() {
    startEditingItem(sale.id);
  }

  function handleDelete() {
    if (deleteItem) deleteItem(sale.id, sale.title);
  }

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
    <Card
      isEditable={true}
      editAction={handleEdit}
      isDeletable={true}
      deleteAction={handleDelete}
    >
      <CardTitle value={sale.title} />
      <CardDescription value={sale.notes} />
      <CardPerson value={sale.to} />
      <CardDate value={sale.date} />
      <View style={{ width: '100%' }}>
        <LazyContainer>
          <FlatList
            data={tableData}
            keyExtractor={(item) => item.id}
            style={{ gap: 4 }}
            renderItem={({ item }) => (
              <SimpleCard>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <MyText style={{ fontWeight: 'bold', color: color.text }}>{item.name}</MyText>
                    <MyText style={{ color: color.textLighter }}>Peso: {item.weight} {item.uom}</MyText>
                    <MyText style={{ color: color.textLighter }}>Prezzo unitario: {item.unit_price} €</MyText>
                    <MyText style={{ color: color.textLighter }}>Quantità: {item.quantity}</MyText>
                  </View>
                  <MyText style={{ fontWeight: 'bold', color: color.text }}>{item.totalPrice} €</MyText>
                </View>
              </SimpleCard>
            )}
          />
        </LazyContainer>
      </View>
      <CardTitle value={'Totale: ' + totalPrice + ' €'} />
    </Card>
  );
}