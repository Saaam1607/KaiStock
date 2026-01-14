import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Expenses from './index';
import NewExpense from './newExpense';
import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();

export default function ExpensesLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="expenses"
        component={Expenses}
        options={{
          header: () => (
            <Header 
              title="Spese"
              rightIconName="create"
              rightIconLabel="Nuova"
              rightIconPress={() => router.push('/warehouse/expenses/newExpense')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="newExpense"
        component={NewExpense}
      />

    </Stack.Navigator>
  );
}