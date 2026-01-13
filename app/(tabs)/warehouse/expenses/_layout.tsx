import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Expenses from './index';
import NewExpense from './newExpense';

const Stack = createNativeStackNavigator();

export default function ExpensesLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="expenses"
        component={Expenses}
        options={{
          title: 'Spese',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuova" iconName="create" action={() => router.push('/warehouse/expenses/newExpense')} />,
        }}
      />

      <Stack.Screen
        name="newExpense"
        component={NewExpense}
        options={{
          title: 'Nuova Spesa',
        }}
      />

    </Stack.Navigator>
  );
}