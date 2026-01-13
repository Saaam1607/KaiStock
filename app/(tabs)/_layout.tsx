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
      initialRouteName="index"
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
        name="trends"
        options={{
          title: 'Andamenti',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'podium-sharp' : 'podium-outline'} color={color} size={iconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
