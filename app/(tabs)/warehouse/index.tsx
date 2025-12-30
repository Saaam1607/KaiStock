import { useRouter } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

import { Header } from '@/components/custom/Header';
import IconButton from '@/components/custom/IconTextButton';

export default function HomeScreen() {
  
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <ThemedView style={styles.mainContainer}>

          <Header text="Magazzino" />

          <View>
            <View style={styles.buttonContainer}>
              <IconButton
                text={"Registro Prodotti"}
                iconName={"book"}
                onPress={() => router.push('/(tabs)/warehouse/products')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <IconButton
                text={"Produci"}
                iconName={"construct-sharp"}
                onPress={() => router.push('/(tabs)/warehouse/produce')}
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
          </View>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
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
    marginBottom: 20,
    justifyContent: 'center',
  },
});
