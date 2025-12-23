import { useRouter } from 'expo-router';

import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconTextButton';

export default function HomeScreen() {
  
  const router = useRouter();

  return (
    <View
       style={styles.mainContainer}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Magazzino</ThemedText>
      </ThemedView>

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

    </View>
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
  }

});
