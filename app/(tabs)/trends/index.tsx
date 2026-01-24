import React from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import IconButton from '@/components/custom/IconTextButton';

export default function Trends() {
  
  const router = useRouter();

  const [isNavigating, setIsNavigating] = React.useState(false);
  
  enum Routes {
    trends = '/(tabs)/trends',
    earningsTrend = '/(tabs)/trends/earningsTrend',
    netEarningsTrend = '/(tabs)/trends/netEarningsTrend',
    expensesTrend = '/(tabs)/trends/expensesTrend',
  }
        
  async function handleButtonPress(route: Routes) {
    if (isNavigating) return;
    setIsNavigating(true);
    try {
      await router.push(route);
    } finally {
      setTimeout(() => {
        setIsNavigating(false);
      }, 200);
    }
  }

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
        <View style={{ flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <IconButton
            text={"Andamento Guadagno Lordo"}
            iconName={"cash-outline"}
            onPress={() => handleButtonPress(Routes.earningsTrend)}
            backgroundImage={require('@/assets/images/trends.jpg')}
          />
          <IconButton
            text={"Andamento Guadagno Netto"}
            iconName={"cash-outline"}
            onPress={() => handleButtonPress(Routes.netEarningsTrend)}
            backgroundImage={require('@/assets/images/trends.jpg')}
          />
          <IconButton
            text={"Andamento Spese"}
            iconName={"logo-euro"}
            onPress={() => handleButtonPress(Routes.expensesTrend)}
            backgroundImage={require('@/assets/images/trends.jpg')}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
}