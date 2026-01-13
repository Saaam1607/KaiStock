import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';

import Trends from './index';
import EarningsTrend from './earningsTrend';
import NetEarningsTrend from './netEarningsTrend';
import ExpensesTrend from './expensesTrend';

const Stack = createNativeStackNavigator();

export default function ExpensesLayout() {

  const router = useRouter();

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
          title: 'Andamento Guadagno Lordo',
          headerLeft: () => <HeaderBtn action = {router.back} />,
        }}
      />
      <Stack.Screen
        name="netEarningsTrend"
        component={NetEarningsTrend}
        options={{
          title: 'Andamento Guadagno Netto',
          headerLeft: () => <HeaderBtn action = {router.back} />,
        }}
      />
      <Stack.Screen
        name="expensesTrend"
        component={ExpensesTrend}
        options={{
          title: 'Andamento Spese',
          headerLeft: () => <HeaderBtn action = {router.back} />,
        }}
      />
    </Stack.Navigator>
  );
}