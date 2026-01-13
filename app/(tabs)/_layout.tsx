import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Tab.Navigator);

function TabItem({ label, icon, activeIcon, focused, color }: any) {
  return (
    <View style={{ alignItems: 'center' }} >
      <Ionicons name={focused ? activeIcon : icon} color={color} size={20} />
      <Text style={{ color, fontSize: 12 }}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBarPosition='bottom'
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#000' },
          tabBarShowIcon: false,
          tabBarLabelStyle: { textTransform: 'none' },
        }}
      >
        <MaterialTopTabs.Screen
          name="warehouse"
          options={{
            tabBarLabel: ({ focused, color }: any) => (
              <TabItem label="Magazzino" icon="storefront-outline" activeIcon="storefront-sharp" focused={focused} color={color} />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="home"
          options={{
            tabBarLabel: ({ focused, color }: any) => (
              <TabItem label="Home" icon="home-outline" activeIcon="home-sharp" focused={focused} color={color} />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="trends"
          options={{
            tabBarLabel: ({ focused, color }: any) => (
              <TabItem label="Andamenti" icon="podium-outline" activeIcon="podium-sharp" focused={focused} color={color} />
            ),
          }}
        />

        <MaterialTopTabs.Screen
          name="settings"
          options={{ title: 'Settings' }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
