import React, { useState } from 'react';

import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Sales from './index';
import NewSale from './newSale';

const Stack = createNativeStackNavigator();

export default function SalesLayout() {

  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  function handleButtonPress() {
    if (isNavigating) return;
    setIsNavigating(true);
    try {
      router.push('/warehouse/sales/newSale')
    } finally {
      setTimeout(() => {
        setIsNavigating(false);
      }, 200);
    }
  }

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="sales"
        component={Sales}
        options={{
          title: 'Vendite',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuova" iconName="create" action={handleButtonPress} />,
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