import React, { memo } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import WarehouseIndex from './index';
import Products from './products';
import Productions from './productions';
import Produce from './produce';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type WarehouseStackParamList = {
  warehouse: undefined;
  products: undefined;
  productions: undefined;
  produce: undefined;
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
      screenOptions={({ route }) => {
        return {
          gestureEnabled: true,
          headerShown: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        };
      }}
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
          title: 'Prodotti',
          headerLeft: () => <HeaderBtnOpt navigation={navigation} action={() => navigation.goBack()}/>,
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
    </Stack.Navigator>
  );
}
