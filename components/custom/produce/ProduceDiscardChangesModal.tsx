import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ItemModal } from '../ItemModal';
import 

import { SearchBar } from '../SearchBar';

import type { Product } from '@/types/Product';

import { products } from '@/types/products';
import Ionicons from '@expo/vector-icons/Ionicons';

type ProduceDiscardChangesModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSave: () => void;
};

export function ProduceDiscardChangesModal({ modalVisible, setModalVisible, onSave }: ProduceDiscardChangesModalProps) {
  
  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Aggiungi articolo"
      okText="Aggiungi"
      notOkText="Annulla"
      onOk={() => onSave()}
      onNotOk={() => setModalVisible(false)}
    >
      <View
        style={styles.bodyContainer}
      >
      </View>
    </ItemModal>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 20,
    flex: 1,
  }
});