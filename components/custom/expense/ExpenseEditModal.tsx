import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ProductForm from '@/components/custom/product/ProductForm';
import ExpenseForm from '@/components/custom/expense/ExpenseForm';
import { ItemModal } from '../ItemModal';

import type { Expense } from '@/types/Expense';

type ExpenseEditModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  expense: Expense;
  onSave: (updatedExpense: Expense) => void;
  onDiscard: () => void;
};

export function ExpenseEditModal({ modalVisible, setModalVisible, expense, onSave, onDiscard }: ExpenseEditModalProps) {
  
  const [editedExpense, setEditedExpense] = useState<Expense>(expense);
  const [oldExpense] = useState<Expense>(expense);

  const handleSave = () => {
    onSave(editedExpense);
    setModalVisible(false);
  };

  function handleDiscard() {
    onDiscard();
    setModalVisible(false);
  }

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Modifica spesa"
      okText="Salva"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={handleDiscard}
    >
      <View style={styles.form}>
        <ExpenseForm
          expense={editedExpense}
          setExpense={setEditedExpense}
          oldExpense={oldExpense}
        />
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