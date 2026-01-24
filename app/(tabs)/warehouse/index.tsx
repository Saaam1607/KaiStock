import React from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import IconTextButton from '@/components/custom/IconTextButton';

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
        <View style={{ flexDirection: 'row', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <IconTextButton
            text="Articoli"
            iconName="book-outline"
            onPress={() => handleButtonPress(Routes.products)}
            backgroundImage={require('@/assets/images/food-product.jpg')}
          />
          <IconTextButton
            text="Produzione"
            iconName="construct-outline"
            onPress={() => handleButtonPress(Routes.productions)}
            backgroundImage={require('@/assets/images/manufacturing.jpg')}
          />
          <IconTextButton
            text="Prenota"
            iconName="bag-outline"
            onPress={() => handleButtonPress(Routes.reservations)}
            backgroundImage={require('@/assets/images/reservations.jpg')}
          />
          <IconTextButton
            text="Vendite"
            iconName="bag-check-outline"
            onPress={() => handleButtonPress(Routes.sales)}
            backgroundImage={require('@/assets/images/sales.jpg')}
          />
          <IconTextButton
            text="Spese"
            iconName="logo-euro"
            onPress={() => handleButtonPress(Routes.expenses)}
            backgroundImage={require('@/assets/images/expenses.jpg')}
          />
          <IconTextButton
            text="Stocks"
            iconName="clipboard-outline"
            onPress={() => handleButtonPress(Routes.stocks)}
            backgroundImage={require('@/assets/images/stocks.jpg')}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
}