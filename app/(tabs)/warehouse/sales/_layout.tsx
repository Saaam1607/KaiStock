import React, { useState } from 'react';

import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sales from './index';
import NewSale from './newSale';
import Header from '@/components/custom/header/Header';

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
          header: () => (
            <Header 
              title="Vendite"
              rightIconName="create"
              rightIconLabel="Nuova"
              rightIconPress={handleButtonPress}
            />
          ),
        }}
      />

      <Stack.Screen
        name="newSale"
        component={NewSale}
      />

    </Stack.Navigator>
  );
}