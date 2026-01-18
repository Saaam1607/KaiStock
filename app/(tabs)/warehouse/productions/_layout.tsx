import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Productions from './index';
import NewProduction from './newProduction';
import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();

export default function ProductionsLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="productions"
        component={Productions}
        options={{
          header: () => (
            <Header 
              title="Produzioni"
              rightIconName="create"
              rightIconLabel="Nuova"
              rightIconPress={() => router.push('/warehouse/productions/newProduction')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="newProduction"
        component={NewProduction}
      />

    </Stack.Navigator>
  );
}