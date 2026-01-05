import React, { useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconButton';



import type { InventoryItem } from '@/types/InventoryItem';
import { initInventoryItem } from '@/types/InventoryItem';

import { EditModal } from '@/components/custom/EditModal';

import { InventoryItemCard } from '@/components/custom/inventoryItem/InventoryItemCard';
import { InventoryItemEditModal } from '@/components/custom/inventoryItem/InventoryItemEditModal';

import { inventoryItems } from '@/types/inventoryItems';

export default function Inventory() {
  
  const router = useRouter();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [quantityEditModalVisible, setQuantityEditModalVisible] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [inventoryItem, setInventoryItem] = useState<InventoryItem>(inventoryItems.find(item => item.product_id === editingItemId) ?? initInventoryItem);
  
  function startEditingQuantity(itemId: string) {
    // setProduct(products.find(item => item.id === itemId) ?? initProduct);
    setEditingItemId(itemId);
    setQuantityEditModalVisible(true);
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

           {quantityEditModalVisible && (
            <>
              <View style={styles.overlay} />

              <InventoryItemEditModal
                modalVisible={quantityEditModalVisible}
                setModalVisible={setQuantityEditModalVisible}
                inventoryItem={inventoryItem}
                onSave={(updatedItem: InventoryItem) => {
                  setSnackbarVisible(true);
                }}
                onDiscard={() => {}}
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
              Inventario
            </ThemedText>

            <IconButton
              iconName="construct-sharp"
              size={50}
              onPress={() => startEditingQuantity(inventoryItem.product_id)}
            />
          </ThemedView>

          <View
            style={styles.bodyContainer}
          >
            <FlatList
              data={inventoryItems}
              keyExtractor={(item) => item.product_id}
              renderItem={({ item }) => (
                <InventoryItemCard
                  inventoryItem={item}
                  startEditingItem={startEditingQuantity}
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
            Inventario aggiornato con successo
          </Snackbar>

        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
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