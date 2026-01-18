import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Trends from './index';
import EarningsTrend from './earningsTrend';
import NetEarningsTrend from './netEarningsTrend';
import ExpensesTrend from './expensesTrend';
import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();

export default function TrendsLayout() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="trends"
        component={Trends}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="earningsTrend"
        component={EarningsTrend}
        options={{
          header: () => (
            <Header 
              title="Andamento Guadagno Lordo"
            />
          ),
        }}
      />
      <Stack.Screen
        name="netEarningsTrend"
        component={NetEarningsTrend}
        options={{
          header: () => (
            <Header 
              title="Andamento Guadagno Netto"
            />
          ),
        }}
      />
      <Stack.Screen
        name="expensesTrend"
        component={ExpensesTrend}
        options={{
          header: () => (
            <Header 
              title="Andamento Spese"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}