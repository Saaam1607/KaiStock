import { View, StyleSheet, Text, FlatList } from 'react-native';

import { useRouter } from 'expo-router';
import { useColor } from '@/hooks/use-color';

import { getAllSales } from '@/components/api/salesApi';


export default function UnpaidSales() {

  const router = useRouter();
  const color = useColor();

  const allSales = getAllSales();

  const unpaidSales = allSales.filter(sale => {
    return !sale.paid
  });

  return (
    <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, borderRadius: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: color.text
        }}
      >
        Vendite non pagate:
      </Text>
      <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, width: 250, justifyContent: 'space-between' }}>
        
        <FlatList
          data={unpaidSales}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: color.text }} >
                {item.title}
              </Text>
              <Text style={{ color: color.text }} >
                {item.to}
              </Text>
              <Text style={{ color: color.text, fontWeight: '800' }} >
                {item.body.reduce((acc, item) => acc + item.quantity * item.unit_price * item.weight, 0)} €
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
});
