import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ProductForm from '@/components/custom/product/ProductForm';
import { ItemModal } from '../ItemModal';

import type { Product } from '@/types/Product';

type ProductEditModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onDiscard: () => void;
};

export function ProductEditModal({ modalVisible, setModalVisible, product, onSave, onDiscard }: ProductEditModalProps) {
  
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [oldProduct] = useState<Product>(product);

  const handleSave = () => {
    onSave(editedProduct);
    setModalVisible(false);
  };

  function handleDiscard() {
    onDiscard();
    setModalVisible(false);
  }

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Modifica articolo"
      okText="Salva"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={handleDiscard}
    >
      <View style={styles.form}>
        <ProductForm
          product={editedProduct}
          setProduct={setEditedProduct}
          oldProduct={oldProduct}
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