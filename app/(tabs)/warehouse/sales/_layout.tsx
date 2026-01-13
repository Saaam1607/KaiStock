import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Sales from './index';
import NewSale from './newSale';

const Stack = createNativeStackNavigator();

export default function SalesLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="sales"
        component={Sales}
        options={{
          title: 'Vendite',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuova" iconName="create" action={() => router.push('/warehouse/sales/newSale')} />,
        }}
      />

      <Stack.Screen
        name="newSale"
        component={NewSale}
        options={{
          title: 'Nuova Vendita',
        }}
      />

    </Stack.Navigator>
  );
}