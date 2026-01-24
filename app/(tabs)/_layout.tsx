import MyText from '@/components/custom/generic/MyText';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { useColor } from '@/hooks/use-color';

const Tab = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Tab.Navigator);

function TabItem({ label, icon, activeIcon, focused, color }: any) {
  return (
    <View style={{ alignItems: 'center' }} >
      <Ionicons name={focused ? activeIcon : icon} color={color} size={20} />
      <MyText style={{ color, fontSize: 14 }}>{label}</MyText>
    </View>
  );
}

export default function TabsLayout() {

  const color = useColor();

  const barColor: string = color.backGroundGradient[color.backGroundGradient.length - 1];

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <MaterialTopTabs
          initialRouteName="home"
          tabBarPosition='bottom'
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: '#454545' },
            tabBarStyle: { backgroundColor: barColor },
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
        </MaterialTopTabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
