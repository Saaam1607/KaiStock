import { View, Text, ScrollView, Animated, Pressable } from 'react-native';
import MyText from '../generic/MyText';

import PressableCard from '@/components/custom/cards/PressableCard';

import { useColor } from '@/hooks/use-color';

import { getAllSales } from '@/components/api/salesApi';

import { computeSalesAmount } from '@/utils/amountUtils';
import { useRef } from 'react';

export default function UndeliveredSales() {

  const color = useColor();

  const allSales = getAllSales();

  const undeliveredSales = allSales.filter(sale => {
    return !sale.delivered;
  });


  return (
    <View>
      <ScrollView nestedScrollEnabled contentContainerStyle={{ gap: 5 }} >
        {undeliveredSales.map(sale => (
          <PressableCard key={sale.id} onLongPressEnd={() => alert("A")}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
                paddingVertical: 8,
                borderRadius: 20,
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
          </PressableCard>
        ))}
      </ScrollView>
    </View>
  );
}