import React from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import IconButton from '@/components/custom/IconTextButton';

export default function Warehouse() {
  
  const router = useRouter();

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
        <View style={styles.buttonContainer}>
          <IconButton
            text="Articoli"
            iconName="book"
            onPress={() => router.push('/(tabs)/warehouse/products')}
          />
          <IconButton
            text="Produzione"
            iconName="construct-sharp"
            onPress={() => router.push('/(tabs)/warehouse/productions')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text="Riserva"
            iconName="bag-sharp"
            onPress={() => router.push('/(tabs)/warehouse/reservations')}
          />
          <IconButton
            text="Vendite"
            iconName="bag-check-sharp"
            onPress={() => router.push('/(tabs)/warehouse/sales')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text="Spese"
            iconName="logo-euro"
            onPress={() => router.push('/(tabs)/warehouse/expenses')}
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
