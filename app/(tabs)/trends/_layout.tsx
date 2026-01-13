import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import WarehouseIndex from './index';

import ExpensesTrend from './(expensesTrend)/expensesTrend';
import EarningsTrend from './(earningsTrend)/earningsTrend';
import NetEarningsTrend from './(netEarningsTrend)/netEarningsTrend';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type WarehouseStackParamList = {
  trends: undefined;
  expensesTrend: undefined;
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
        name="trends"
        component={WarehouseIndex}
        options={({ navigation }) => ({
          title: 'Andamenti',
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
