import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ItemModal } from '../ItemModal';

import type { InventoryItem } from '@/types/InventoryItem';

import { inventoryItems } from '@/types/inventoryItems';

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
});