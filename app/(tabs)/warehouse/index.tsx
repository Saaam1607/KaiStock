import React from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import IconButton from '@/components/custom/IconTextButton';

export default function Warehouse() {

  const router = useRouter();
  
  const [isNavigating, setIsNavigating] = React.useState(false);

  enum Routes {
    warehouse = '/(tabs)/warehouse',
    products = '/(tabs)/warehouse/products',
    newProduct = '/(tabs)/warehouse/products/newProduct',
    stocks = '/(tabs)/warehouse/stocks',
    productions = '/(tabs)/warehouse/productions',
    newProduction = '/(tabs)/warehouse/productions/newProduction',
    reservations = '/(tabs)/warehouse/reservations',
    sales = '/(tabs)/warehouse/sales',
    expenses = '/(tabs)/warehouse/expenses',
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
        <View style={styles.buttonContainer}>
          <IconButton
            text="Articoli"
            iconName="book"
            onPress={() => handleButtonPress(Routes.products)}
          />
          <IconButton
            text="Produzione"
            iconName="construct-sharp"
            onPress={() => handleButtonPress(Routes.productions)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text="Prenota"
            iconName="bag-sharp"
            onPress={() => handleButtonPress(Routes.reservations)}
          />
          <IconButton
            text="Vendite"
            iconName="bag-check-sharp"
            onPress={() => handleButtonPress(Routes.sales)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text="Spese"
            iconName="logo-euro"
            onPress={() => handleButtonPress(Routes.expenses)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            text="Stocks"
            iconName="clipboard"
            onPress={() => handleButtonPress(Routes.stocks)}
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
