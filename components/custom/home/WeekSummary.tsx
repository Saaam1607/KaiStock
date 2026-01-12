import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';

import { useRouter } from 'expo-router';
import { useColor } from '@/hooks/use-color';

import { getAllExpenses } from '@/components/api/expensesApi';
import { getAllSales } from '@/components/api/salesApi';

import Svg, { Path } from 'react-native-svg';

import { Ionicons } from '@expo/vector-icons';

export default function WeekSummary() {

  const router = useRouter();
  const color = useColor();

  const allExpenses = getAllExpenses();
  const allSales = getAllSales();

  const { width } = useWindowDimensions();
  const height = 400;

  function getThisWeekRange() {
    const now = new Date();
    const day = now.getDay(); // 0 = domenica, 1 = lunedì, ..., 6 = sabato

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
  }

  const { monday, sunday } = getThisWeekRange();

  const thisWeekExpenses = allExpenses.filter(expense => {
    const date = new Date(expense.date);
    return date >= monday && date <= sunday;
  });

  const thisWeekSales = allSales.filter(sale => {
    const date = new Date(sale.date);
    return date >= monday && date <= sunday;
  });

  const thisWeekExpensesAmount = Math.round(thisWeekExpenses.reduce(
    (total, expense) => total + expense.price,
    0
  ));

  const thisWeekSalesAmount = Math.round(thisWeekSales.reduce(
    (total, sale) =>
      total +
      sale.body.reduce((sum, item) => sum + item.quantity * item.unit_price * item.weight, 0),
    0
  ));

  const thisWeekNumberOfSoldProducts = thisWeekSales.reduce(
    (total, sale) =>
      total +
      sale.body.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
      {/* Shadow layer */}
      <View
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          width: '100%',
          height: '100%',
          borderRadius: 25,
          backgroundColor: 'rgb(46, 76, 72)',
          zIndex: 0,
        }}
      />
      <View style={{
        borderRadius: 25,
        gap: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgb(72, 117, 111)',
        overflow: 'hidden',
      }}>

        {/* viewBox="minX minY width height" */}
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <Path
            d={`
              M0,${height * 0.45}
              C${width * 0.25},${height * 0.8}
              ${width * 0.6},${-height * 0.2}
              ${width},${height * 0.4}
              L${width},0
              L0,0
              Z
            `}
            fill="rgba(255,255,255,0.25)"
          />

          <Path
            d={`
              M0,${height * 0.85}
              C${width * 0.3},${height * 0.6}
              ${width * 0.7},${height * 1.3}
              ${width},${height * 0.75}
              L${width},0
              L0,0
              Z
            `}
            fill="rgba(255,255,255,0.08)"
          />
        </Svg>
        <View style={{ padding: 10, width: '100%' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'rgb(71, 95, 84)',
            }}
          >
            Questa settimana:
          </Text>
          <View style={{ padding: 10, width: 300, justifyContent: 'space-between' }}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
              <Text style={{ color: color.text, fontWeight: '800', fontSize: 25 }} >
                {thisWeekNumberOfSoldProducts}
              </Text>
              <Text style={{ color: color.text, fontSize: 18 }} >
                Prodotti venduti
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
              <Text style={{ color: color.red, fontWeight: '800', fontSize: 25 }} >
                {thisWeekExpensesAmount} €
              </Text>
              <Text style={{ color: color.text, fontSize: 18 }} >
                Spese
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
              <Text style={{ color: color.green, fontWeight: '800', fontSize: 25 }} >
                {thisWeekSalesAmount} €
              </Text>
              <Text style={{ color: color.text, fontSize: 18 }} >
                Entrate
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: 10, justifyContent: 'flex-end', width: '100%' }}>
            <View style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: 'white'}} />
            <View style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: 'grey'}} />
            <View style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: 'grey'}} />
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
});
