import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconButton';


import Product from '@/types/Product';

import { ItemCard } from '@/components/custom/ItemCard';

const products: Product[] = [
  { id: '1', name: 'Mela', description: 'Mela fresca biologica', price: 0.5 },
  { id: '2', name: 'Pane', description: 'Pane integrale fatto in casa', price: 2.0 },
  { id: '3', name: 'Formaggio', description: 'Formaggio stagionato', price: 3.5 },
];

export default function Products() {
  
  const router = useRouter();

  return (
    <View
      style={styles.mainContainer}
    >
      <ThemedView
        style={styles.titleContainer}
      >

        <IconButton
          iconName="chevron-back-circle-outline"
          onPress={() => router.back()}
        />

        <ThemedText
          style={{ marginTop: 0, marginBottom: 0, padding: 0 }}
          type="title"
        >
          Prodotti
        </ThemedText>
      </ThemedView>

      <View
        style={styles.bodyContainer}
      >
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard product={item} />}
          contentContainerStyle={{ padding: 16 }}
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
  bodyContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  }

});