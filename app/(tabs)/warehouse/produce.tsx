import React, { useState } from 'react';

import { useRouter } from 'expo-router';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';
import { MySnackBar } from '@/components/custom/MySnackBar';

import type { Production, ProductionBodyItem } from '@/types/Production';
import { initProduction } from '@/types/Production';

import { Header } from '@/components/custom/Header';

import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { ProductionForm } from '@/components/custom/produce/ProductionForm';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Produce() {
  
  const router = useRouter();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);
  // const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);
  const [productionItems, setProductionItems] = useState<ProductionBodyItem[]>([]);
  

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  function handleSave(selectedIds: string[]) {
    setSnackbarVisible(true);
    
    selectedIds.map(id => {
      if (!productionItems.find(item => item.product_id === id)) {
        setProductionItems(prev => [...prev, { product_id: id, quantity: 0 }]);
      }
    });

    productionItems.map(item => {
      if (!selectedIds.includes(item.product_id)) {
        setProductionItems(prev => prev.filter(i => i.product_id !== item.product_id));
      }
    });

  }

  return (
    <PageContainer>
    
      {/* Modal */}
      <ModalContainer visible={showAddProductModal}>
        <ProductionAddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
          selectedIds={productionItems.map(item => item.product_id)}
          onSave={handleSave}
        />
      </ModalContainer>

      {/* Header */}
      <HeaderContainer>
        <Header
          text="Produci"
          leftIconName="chevron-back-circle-outline"
          leftIconPress={() => router.back()}
          rightIconName="add-circle-outline"
          rightIconPress={() => router.back()}
        />
      </HeaderContainer>
    
      {/* Body */}
      <BodyContainer>

        <View
          style={styles.bodyContainer}
        >
          <ProductionForm
            production={newProduction}
            setProduction={setNewProduction}
            productionItems={productionItems}
            setProductionItems={setProductionItems}
            setShowAddProductModal={setShowAddProductModal}
          />
          
        </View>

      </BodyContainer>
    
      {/* Notifications */}
      <MySnackBar
        visible={snackbarVisible}
        setVisible={setSnackbarVisible}
        message={'Prodotto aggiornati'}
      />
    
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
  }
});