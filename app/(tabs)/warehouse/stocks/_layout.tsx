import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Stocks from './index';
import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();

export default function StocksLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="stocks"
        component={Stocks}
        options={{
          header: () => (
            <Header 
              title="Stocks"
              rightIconPress={() => router.push('/warehouse/expenses/newExpense')}
            />
          ),
        }}
      />

    </Stack.Navigator>
  );
}