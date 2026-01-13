import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { getAllSales } from '@/components/api/salesApi';

import { computeSalesAmount } from '@/utils/amountUtils';
import { CardContainer } from './CardContainer';

export default function UnpaidSales() {

  const color = useColor();

  const allSales = getAllSales();

  const unpaidSales = allSales.filter(sale => {
    return !sale.paid && !sale.delivered;
  });

  const totalToEarn = computeSalesAmount(unpaidSales);

  return (
    <CardContainer>
      <View style={{ width: '100%', padding: 10, borderRadius: 20, gap: 10 }} >
        <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(50, 70, 61)' }} >
          Vendite consegnate non pagate ({unpaidSales.length}):
        </Text>
        <View style={{ width: '100%', justifyContent: 'space-between',  maxHeight: 300 }} >
          <ScrollView nestedScrollEnabled contentContainerStyle={{ gap: 5 }} >
            {unpaidSales.map(sale => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 10,
                  backgroundColor: 'rgb(66, 113, 112)',
                }}
                key={sale.id}
              >
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <Text style={{ color: color.text }} >
                    {sale.title}
                  </Text>
                  <Text style={{ color: color.text }} >
                    {sale.to}
                  </Text>
                </View>
                
                <Text style={{ color: color.text, fontWeight: '800' }} >
                  {sale.body.reduce((acc, item) => acc + item.quantity * item.unit_price * item.weight, 0)} €
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Text style={{ color: color.text }}>
          Totale da incassare: {totalToEarn} €
        </Text>
      </View>
    </CardContainer>
  );
}