import React, { memo } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import WarehouseIndex from './index';

import Products from './products';
import NewProduct from './newProduct';

import Productions from './productions';
import Produce from './produce';

import Reservations from './reservations';
import NewReservation from './newReservation';

import Sales from './sales';
import NewSale from './newSale';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type WarehouseStackParamList = {
  warehouse: undefined;
  products: undefined;
  newProduct: undefined;
  productions: undefined;
  produce: undefined;
  reservations: undefined;
  newReservation: undefined;
  sales: undefined;
  newSale: undefined;
};

type HeaderBtnProps = {
  navigation: any;
  action?: () => void;
  iconName?: string;
};

function HeaderBtn({ navigation, action, iconName = "arrow-back" }: HeaderBtnProps) {
  
  const color = useColor();
  
  return (
    <TouchableOpacity
      onPress={() => {
        if (action)
          action()
      }}
      style={{ paddingHorizontal: 10 }}
    >
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
}
export const HeaderBtnOpt = memo(HeaderBtn);

const Stack = createStackNavigator<WarehouseStackParamList>();

export default function WarehouseLayout() {

  return (
    <Stack.Navigator
      screenOptions={{ animation: 'none' }}
      // screenOptions={({ route }) => {
      //   return {
      //     gestureEnabled: true,
      //     headerShown: true,
      //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      //   };
      // }}
    >
      <Stack.Screen
        name="warehouse"
        component={WarehouseIndex}
        options={({ navigation }) => ({
          title: 'Magazzino',
        })}
      />

      <Stack.Screen
        name="products"
        component={Products}
        options={({ navigation }) => ({
          title: 'Articoli',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.navigate('newProduct')} iconName="create" />,

        })}
      />

      <Stack.Screen
        name="newProduct"
        component={NewProduct}
        options={({ navigation }) => ({
          title: 'Nuovo Articolo',
        })}
      />

      <Stack.Screen
        name="productions"
        component={Productions}
        options={({ navigation }) => ({
          title: 'Produzioni',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.navigate('produce')} iconName="create" />,
        })}
      />

      <Stack.Screen
        name="produce"
        component={Produce}
        options={({ navigation }) => ({
          title: 'Nuova Produzione',
        })}
      />

      <Stack.Screen
        name="reservations"
        component={Reservations}
        options={({ navigation }) => ({
          title: 'Prenotazioni',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.navigate('newReservation')} iconName="create" />,
        })}
      />

      <Stack.Screen
        name="newReservation"
        component={NewReservation}
        options={({ navigation }) => ({
          title: 'Nuova Prenotazione',
        })}
      />

      <Stack.Screen
        name="sales"
        component={Sales}
        options={({ navigation }) => ({
          title: 'Vendite',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.navigate('newSale')} iconName="create" />,
        })}
      />

      <Stack.Screen
        name="newSale"
        component={NewSale}
        options={({ navigation }) => ({
          title: 'Nuova Vendita',
        })}
      />

    </Stack.Navigator>
  );
}
