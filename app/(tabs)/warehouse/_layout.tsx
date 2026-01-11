import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import WarehouseIndex from './index';

import NewProduct from './(products)/newProduct';
import Products from './(products)/products';

import Expenses from './(expenses)/expenses';
import NewExpense from './(expenses)/newExpense';
import ExpensesTrend from './(expensesTrend)/expensesTrend';

import Produce from './(productions)/produce';
import Productions from './(productions)/productions';

import NewReservation from './(reservations)/newReservation';
import Reservations from './(reservations)/reservations';

import NewSale from './(sales)/newSale';
import Sales from './(sales)/sales';

import EarningsTrend from './(earningsTrend)/earningsTrend';
import NetEarningsTrend from './(netEarningsTrend)/netEarningsTrend';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type WarehouseStackParamList = {
  warehouse: undefined;
  products: undefined;
  newProduct: undefined;
  expenses: undefined;
  newExpense: undefined;
  expensesTrend: undefined;
  productions: undefined;
  produce: undefined;
  reservations: undefined;
  newReservation: undefined;
  sales: undefined;
  newSale: undefined;
  earningsTrend: undefined;
  netEarningsTrend: undefined;
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

type HeaderBtnWithTextProps = {
  navigation: any;
  action?: () => void;
  iconName?: string;
  text: string;
};

function HeaderBtnWithText({ navigation, action, iconName = "arrow-back", text }: HeaderBtnWithTextProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={() => {
        if (action)
          action()
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ color: color.icon, fontWeight: 'bold' }}>{text}</Text>
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
}
export const HeaderBtnWithTextOpt = memo(HeaderBtnWithText);

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
          headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newProduct')} text="Nuovo" iconName="create" />,

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
        name="expenses"
        component={Expenses}
        options={({ navigation }) => ({
          title: 'Spese',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newExpense')} text="Nuova" iconName="create" />,
        })}
      />

      <Stack.Screen
        name="newExpense"
        component={NewExpense}
        options={({ navigation }) => ({
          title: 'Nuova Spesa',
        })}
      />

      <Stack.Screen
        name="expensesTrend"
        component={ExpensesTrend}
        options={({ navigation }) => ({
          title: 'Andamento Spese',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
        })}
      />

      <Stack.Screen
        name="productions"
        component={Productions}
        options={({ navigation }) => ({
          title: 'Produzioni',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('produce')} text="Nuova" iconName="create" />,
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
          headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newReservation')} text="Nuova" iconName="create" />,
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
          headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newSale')} text="Nuova" iconName="create" />,
        })}
      />

      <Stack.Screen
        name="newSale"
        component={NewSale}
        options={({ navigation }) => ({
          title: 'Nuova Vendita',
        })}
      />

      <Stack.Screen
        name="earningsTrend"
        component={EarningsTrend}
        options={({ navigation }) => ({
          title: 'Andamento Guadagno Lordo',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          // headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newSale')} text="Nuova" iconName="create" />,
        })}
      />

      <Stack.Screen
        name="netEarningsTrend"
        component={NetEarningsTrend}
        options={({ navigation }) => ({
          title: 'Andamento Guadagno Netto',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
          // headerRight: () => <HeaderBtnWithTextOpt navigation={navigation} action={() => navigation.navigate('newSale')} text="Nuova" iconName="create" />,
        })}
      />

    </Stack.Navigator>
  );
}
