import { useRouter } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconTextButton';

export default function HomeScreen() {
  
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <ThemedView style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Magazzino</ThemedText>
          </View>
          <View
            style={styles.buttonContainer}
          >
            <IconButton
              text={"Registro Prodotti"}
              iconName={"book"}
              onPress={() => router.push('/(tabs)/warehouse/products')}
            />
            <IconButton
              text={"Inventario"}
              iconName={"clipboard"}
              onPress={() => router.push('/(tabs)/warehouse/inventory')}
            />
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  }
});
