import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text } from 'react-native';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Products from './index';
import NewProduct from './newProduct';

import { getHeaderTitle } from '@react-navigation/elements';

import { useColor } from '@/hooks/use-color';

import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();



export default function ProductsLayout() {

  const router = useRouter();
  const color = useColor();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="products"
        component={Products}
        options={{
          header: () => (
            <Header 
              title="Prodotti"
              rightIconName="create"
              rightIconLabel="Nuovo"
              rightIconPress={() => router.push('/warehouse/products/newProduct')}
            />
          ),
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