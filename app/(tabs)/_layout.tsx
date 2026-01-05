import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const iconSize = 20;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}>
      <Tabs.Screen
        name="warehouse"
        options={{
          title: 'Magazzino',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'storefront-sharp' : 'storefront-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="warehouse/products"
        options={{ href: null }}  
      /> */}
      {/* <Tabs.Screen
        name="warehouse/produce"
        options={{ href: null }}  
      /> */}
      {/* <Tabs.Screen
        name="warehouse/productions"
        options={{ href: null }}  
      /> */}
      {/* <Tabs.Screen
        name="warehouse/inventory"
        options={{ href: null }}  
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Ordine',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'fast-food-sharp' : 'fast-food-outline'} color={color} size={iconSize} />
          ),
        }}
      />


    </Tabs>
  );
}
