import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LazyContainer } from '../containers/LazyContainer';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import { useColor } from '@/hooks/use-color';

import { Card, CardDate, CardDescription, CardTitle } from '@/components/custom/containers/Card';

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
      <CardTitle value={sale.to} />
      <CardDescription value={sale.notes} />
      <CardDate value={sale.date} />
      <View style={{ width: '100%' }}>
        <LazyContainer>
          <SaleTable data={tableData as SaleTableRow[]} />
        </LazyContainer>
      </View>
      <CardTitle value={'Totale: ' + totalPrice + ' €'} />
    </Card>
  );
}