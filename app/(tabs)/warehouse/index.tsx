import { useRouter } from 'expo-router';

import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';

import { Header } from '@/components/custom/Header';
import IconButton from '@/components/custom/IconTextButton';

export default function HomeScreen() {
  
  const router = useRouter();

  return (
    <PageContainer>

      <HeaderContainer>
        <Header text="Magazzino" />
      </HeaderContainer>

      <ScrollView
        style={{
        }}
        contentContainerStyle={{
          gap: 20,
          padding: 20
        }}
      >
        <View style={styles.buttonContainer}>
          <IconButton
            text={"Prodotti"}
            iconName={"book"}
            onPress={() => router.push('/(tabs)/warehouse/products')}
          />
          <IconButton
            text={"Produzione"}
            iconName={"construct-sharp"}
            onPress={() => router.push('/(tabs)/warehouse/productions')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            text={"Riserva"}
            iconName={"bag-sharp"}
            onPress={() => router.push('/(tabs)/warehouse/orders')}
          />
          <IconButton
            text={"Vendi"}
            iconName={"bag-check-sharp"}
            onPress={() => router.push('/(tabs)/warehouse/orders')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            text={"Inventario"}
            iconName={"clipboard"}
            onPress={() => router.push('/(tabs)/warehouse/inventory')}
          />
          <IconButton
            text={"Storico Inventario"}
            iconName={"time"}
            onPress={() => router.push('/(tabs)/warehouse/inventory')}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
});
