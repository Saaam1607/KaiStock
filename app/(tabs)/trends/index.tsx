import React from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import IconButton from '@/components/custom/IconTextButton';

export default function Trends() {
  
  const router = useRouter();

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
        <View style={styles.buttonContainer}>
          <IconButton
            text={"Andamento Guadagno Lordo"}
            iconName={"cash-outline"}
            onPress={() => router.push('/(tabs)/trends/earningsTrend')}
          />
          <IconButton
            text={"Andamento Guadagno Netto"}
            iconName={"cash-outline"}
            onPress={() => router.push('/(tabs)/trends/netEarningsTrend')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            text={"Andamento Spese"}
            iconName={"logo-euro"}
            onPress={() => router.push('/(tabs)/trends/expensesTrend')}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
});
