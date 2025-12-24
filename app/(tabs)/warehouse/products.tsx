import React, { useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconButton';


import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';


import { EditModal } from '@/components/custom/EditModal';
import { ProductCard } from '@/components/custom/product/ProductCard';
import { ProductCreateModal } from '@/components/custom/product/ProductCreateModal';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';

import { products } from '@/types/products';

export default function Products() {
  
  const router = useRouter();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);
  const [itemCreateModalVisible, setItemCreateModalVisible] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [product, setProduct] = useState<Product>(products.find(item => item.id === editingItemId) ?? initProduct);
  
  function startEditingItem(itemId: string) {
    setProduct(products.find(item => item.id === itemId) ?? initProduct);
    setEditingItemId(itemId);
    setItemEditModalVisible(true);
  }

  function stopEditing() {
    setEditingItemId(null);
  }

  function startCreatingNewItem() {
    setProduct(initProduct);
    setItemCreateModalVisible(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <ThemedView style={{ flex: 1 }}>

          {editModalVisible && (
            <View style={styles.overlay} />
          )}
          <EditModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
          />

          {itemCreateModalVisible && (
            <>
              <View style={styles.overlay} />

              <ProductCreateModal
                modalVisible={itemCreateModalVisible}
                setModalVisible={setItemCreateModalVisible}
                product={product}
                onSave={(updatedProduct: Product) => {
                  setSnackbarVisible(true);
                }}
              />
            </>
          )}

          {itemEditModalVisible && product && (
            <>
              <View style={styles.overlay} />

              <ProductEditModal
                modalVisible={itemEditModalVisible}
                setModalVisible={setItemEditModalVisible}
                product={product}
                onSave={(updatedProduct: Product) => {
                  setSnackbarVisible(true);
                }}
                onDiscard={() => {
                  stopEditing();
                }}
              />
            </>
          )}

          <ThemedView
            style={styles.titleContainer}
          >
            <IconButton
              iconName="chevron-back-circle-outline"
              size={50}
              onPress={() => router.back()}
            />

            <ThemedText
              style={{ marginTop: 0, marginBottom: 0, padding: 0 }}
              type="title"
            >
              Prodotti
            </ThemedText>

            <IconButton
              iconName="add-circle-outline"
              size={50}
              onPress={() => startCreatingNewItem()}
            />
          </ThemedView>

          <View
            style={styles.bodyContainer}
          >
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  startEditingItem={startEditingItem}
                />
              )}
              contentContainerStyle={{ padding: 16 }}
            />
          </View>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: 'Ok',
              onPress: () => {
                setSnackbarVisible(false);
              },
            }}
            duration={5000}
            style={{ zIndex: 600 }}
          >
            Prodotto salvato con successo
          </Snackbar>

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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  }

});