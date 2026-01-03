import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

import ProductForm from '@/components/custom/product/ProductForm';
import { ItemModal } from '../ItemModal';

import type { Product } from '@/types/Product';

type ProductCreateModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
};

export function ProductCreateModal({ modalVisible, setModalVisible, product, onSave }: ProductCreateModalProps) {
  
  const color = useColor();

  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleSave = () => {
    onSave(editedProduct);
    setModalVisible(false);
  };

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Crea articolo"
      okText="Crea"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={() => setModalVisible(false)}
    >
      <View style={styles.form}>
        <ProductForm
          product={editedProduct}
          setProduct={setEditedProduct}
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