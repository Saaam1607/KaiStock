import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { ItemModal } from '../ItemModal';

import type { InventoryItem } from '@/types/InventoryItem';

import { inventoryItems } from '@/types/inventoryItems';

import { InventoryItemCardSmall } from './InventoryItemCardSmall';
import DateInput from '../DateInput';

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
  const [movementDate, setMovementDate] = useState(new Date(1598051730000));

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
      modalTitle="Aggiorna Inventario"
      item={editedItem}
      okText="Crea"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={handleDiscard}
    >
      <View style={styles.form}>
        <FlatList
          data={inventoryItems}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <InventoryItemCardSmall
              inventoryItem={item}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Movimento</Text>
              <TextInput
                style={styles.input}
                value={movementName}
                onChangeText={text => setMovementName(text)}
              />
              {/* <TextInput
                style={styles.input}
                value={movementDate}
                onChangeText={setMovementDate}
                keyboardType="numeric"
                placeholder="DD/MM/YYYY"
                maxLength={10}
              /> */}
              <DateInput
                date={movementDate}
                setDate={setMovementDate}
              />
            </View>
          }
        />
      </View>
    </ItemModal>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    height: '100%',
    gap: 10
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