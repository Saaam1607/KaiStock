import React, { useState } from 'react';

import { useRouter } from 'expo-router';

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';
import { MySnackBar } from '@/components/custom/MySnackBar';

import type { Production, ProductionBodyItem } from '@/types/Production';
import { initProduction } from '@/types/Production';

import { Header } from '@/components/custom/Header';
import { MyAlert } from '@/components/custom/MyAlert';

import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { ProduceDiscardChangesModal } from '@/components/custom/produce/ProduceDiscardChangesModal';
import { ProductionForm } from '@/components/custom/produce/ProductionForm';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Produce() {
  
  const router = useRouter();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);
  // const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);
  const [productionItems, setProductionItems] = useState<ProductionBodyItem[]>([]);
  

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  function handleItemAdd(selectedIds: string[]) {
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

  function handleSave() {
    if (newProduction === initProduction && productionItems.length === 0) {
      setShowDiscardChangesModal(true);
      // Alert.alert(
      //   'Modifiche non salvate',
      //   'Vuoi uscire senza salvare le modifiche?',
      //   [
      // {
      //   text: 'Esci',
      //   style: 'destructive',
      //   onPress: () => {
      //     // Logica per uscire / chiudere modal
      //     // router.goBack(); // ad esempio
      //   },
      // },
      // {
      //   text: 'Continua',
      //   style: 'cancel',
      //   onPress: () => {
      //     // Rimani sulla pagina, niente da fare
      //   },
      // },
      //   ],
      //   {cancelable: false},
      // );
      return;
    }
    

    setNewProduction(initProduction);
    setProductionItems([]);
    setSnackbarVisible(true);
  }

  return (
    <PageContainer>
    
      {/* Modal */}
      <ModalContainer visible={showAddProductModal}>
        <ProductionAddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
          selectedIds={productionItems.map(item => item.product_id)}
          onSave={handleItemAdd}
        />
      </ModalContainer>

      <ModalContainer visible={showDiscardChangesModal}>
        <MyAlert
          alertVisible={showDiscardChangesModal}
          alertTitle="Modifiche non salvate"
          alertMessage="Vuoi uscire senza salvare le modifiche?"
          okText="Esci"
          notOkText="Continua"
          onOk={() => router.push('/(tabs)/warehouse/productions')}
          onNotOk={() => setShowDiscardChangesModal(false)}
        />
      </ModalContainer>


      {/* Header */}
      <HeaderContainer>
        <Header
          text="Nuova Produzione"
          leftIconName="chevron-back"
          leftIconPress={() => router.push('/(tabs)/warehouse/productions')}
          rightIconName="save-outline"
          rightIconPress={() => handleSave()}
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
    paddingVertical: 10,
  }
});