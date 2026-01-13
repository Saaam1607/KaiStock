import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Products from './index';
import NewProduct from './newProduct';

const Stack = createNativeStackNavigator();

export default function ProductsLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="products"
        component={Products}
        options={{
          title: 'Prodotti',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuovo" iconName="create" action={() => router.push('/warehouse/products/newProduct')} />,
        }}
      />

      <Stack.Screen
        name="newProduct"
        component={NewProduct}
        options={{
          title: 'Nuovo Prodotto',
        }}
      />

    </Stack.Navigator>
  );
}