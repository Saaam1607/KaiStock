import { View, StyleSheet, Text } from 'react-native';

import { useRouter } from 'expo-router';
import { useColor } from '@/hooks/use-color';

import { getAllExpenses } from '@/components/api/expensesApi';
import { getAllSales } from '@/components/api/salesApi';


export default function WeekSummary() {

  const router = useRouter();
  const color = useColor();

  const allExpenses = getAllExpenses();
  const allSales = getAllSales();

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
    <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, borderRadius: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: color.text
        }}
      >
        Questa settimana:
      </Text>
      <View style={{ borderColor: 'red', borderWidth: 2, padding: 10, width: 250, justifyContent: 'space-between' }}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Text style={{ color: color.text }} >
            Prodotti venduti:
          </Text>
          <Text style={{ color: color.text, fontWeight: '800' }} >
            {thisWeekNumberOfSoldProducts}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Text style={{ color: color.text }} >
            Spese:
          </Text>
          <Text style={{ color: color.red, fontWeight: '800' }} >
            - {thisWeekExpensesAmount} €
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Text style={{ color: color.text }} >
            Entrate:
          </Text>
          <Text style={{ color: color.green, fontWeight: '800' }} >
            + {thisWeekSalesAmount} €
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
});
