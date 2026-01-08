import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { useColor } from '@/hooks/use-color';

import { ItemModal } from '../ItemModal';

import { SearchBar } from '../SearchBar';
import { Stepper } from '../Stepper';
import { AddSoldItemStepper } from './AddSoldItemStepper';

import type { Product } from '@/types/Product';

import Ionicons from '@expo/vector-icons/Ionicons';

type AddSoldItemModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleSubmit: (product: Product, weight: number, quantity: number) => void;
  selectedIds: string[];
  onSave: (selectedIds: string[]) => void;
};

export function AddSoldItemModal({ modalVisible, setModalVisible, handleSubmit, selectedIds, onSave }: AddSoldItemModalProps) {
  
  const color = useColor();



  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Aggiungi articolo"
      // okText="Aggiungi"
      // notOkText="Annulla"
      // onOk={handleSave}
      onNotOk={() => setModalVisible(false)}
    >
      <View
        style={styles.bodyContainer}
      >
        <AddSoldItemStepper
          handleSubmit={handleSubmit}
        />
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