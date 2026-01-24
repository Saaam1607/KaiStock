import { View, ScrollView } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';

import { getAllSales } from '@/components/api/salesApi';

import { computeSalesAmount } from '@/utils/amountUtils';

export default function UnpaidSales() {

  const color = useColor();

  const allSales = getAllSales();

  const unpaidSales = allSales.filter(sale => {
    return !sale.paid && sale.delivered;
  });

  const totalToEarn = computeSalesAmount(unpaidSales);

  return (
    <View>
      <ScrollView nestedScrollEnabled contentContainerStyle={{ gap: 5 }} >
        {unpaidSales.map(sale => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: color.cardBackground,
            }}
            key={sale.id}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <MyText style={{ color: color.text }} >
                {sale.title}
              </MyText>
              <MyText style={{ color: color.textLighter }} >
                {sale.to}
              </MyText>
            </View>
            
            <MyText style={{ color: color.textLighter, fontWeight: '800' }} >
              {sale.body.reduce((acc, item) => acc + item.quantity * item.unit_price * item.weight, 0)} €
            </MyText>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 8,  }} >
        <MyText style={{ color: color.text }}>
          Totale da incassare: {totalToEarn} €
        </MyText>
      </View>
      
    </View>
  );
}