import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { ItemModal } from '../ItemModal';

import type { InventoryItem } from '@/types/InventoryItem';

import { inventoryItems } from '@/types/inventoryItems';

import { InventoryItemCardSmall } from './InventoryItemCardSmall';

type InventoryItemEditModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  inventoryItem: InventoryItem;
  onSave: (updatedProduct: InventoryItem) => void;
  onDiscard: () => void;
};

export function InventoryItemEditModal({ modalVisible, setModalVisible, inventoryItem, onSave, onDiscard }: InventoryItemEditModalProps) {
  
  const [editedItem, setEditedItem] = useState<InventoryItem>(inventoryItem);
  const [oldItem] = useState<InventoryItem>(inventoryItem);

  const [movementName, setMovementName] = useState<string>("");

  const handleSave = () => {
    onSave(editedItem);
    setModalVisible(false);
  };

  function handleDiscard() {
    onDiscard();
    setModalVisible(false);
  }

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Modifica quantità"
      item={editedItem}
      okText="Salva"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={handleDiscard}
    >
      <View style={styles.form}>

        <Text style={styles.label}>Movimento</Text>
        <TextInput
          style={styles.input}
          value={movementName}
          onChangeText={text => setMovementName(text)}
        />

        <FlatList
          data={inventoryItems}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <InventoryItemCardSmall
              inventoryItem={item}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />

        {/* <ProductForm
          product={editedProduct}
          setProduct={setEditedProduct}
          oldProduct={oldProduct}
        /> */}
      </View>
    </ItemModal>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
  },
});