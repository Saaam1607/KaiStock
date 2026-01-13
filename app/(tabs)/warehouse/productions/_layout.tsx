import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Productions from './index';
import NewProduction from './newProduction';

const Stack = createNativeStackNavigator();

export default function ProductionsLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="productions"
        component={Productions}
        options={{
          title: 'Produzioni',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuova" iconName="create" action={() => router.push('/warehouse/productions/newProduction')} />,
        }}
      />

      <Stack.Screen
        name="newProduction"
        component={NewProduction}
        options={{
          title: 'Nuova Produzione',
        }}
      />

    </Stack.Navigator>
  );
}