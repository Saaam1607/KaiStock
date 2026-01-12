import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';
import { useColor } from '@/hooks/use-color';

import type { Sale } from '@/types/Sale';
import { getAllSales } from '@/components/api/salesApi';


export default function UnpaidSales() {

  const router = useRouter();
  const color = useColor();

  const allSales = getAllSales();

  const unpaidSales = allSales.filter(sale => {
    return !sale.paid && !sale.delivered;
  });

  function getTotalToEarnFromSales(sales: Sale[]) {
    let amount = 0;
    sales.map(sale => {
      sale.body.map(item => amount += item.quantity * item.unit_price * item.weight);
    });
    return amount;
  }

  const totalToEarn = getTotalToEarnFromSales(unpaidSales);

  return (
    <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, borderRadius: 10, gap: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: color.text
        }}
      >
        Vendite consegnate non pagate:
      </Text>
      <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, width: 500, height: 300, justifyContent: 'space-between' }}>
        
        <ScrollView
          contentContainerStyle={{
            gap: 5
          }}
        >
          {unpaidSales.map(sale => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: 'red',
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10
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
      <Text
        style={{
          color: color.text
        }}
      >
        Totale da incassare: {totalToEarn} €
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
});
