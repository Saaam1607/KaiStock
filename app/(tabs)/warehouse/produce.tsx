import React, { useState, useEffect } from 'react';

import { useNavigation, useRouter } from 'expo-router';

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
import { ProductionForm } from '@/components/custom/produce/ProductionForm';

import { GestureContainer } from '@/components/custom/GestureContainer';
import { HeaderBtnOpt } from './_layout';

export default function Produce() {
  
  const navigation = useNavigation();
  const router = useRouter();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);
  const [productionItems, setProductionItems] = useState<ProductionBodyItem[]>([]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => { console.log(newProduction)}, [newProduction])

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

  function handleBack() {
    if (newProduction !== initProduction || productionItems.length > 0) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack()
  }

  function backAndReset() {
    setNewProduction(initProduction);
    setProductionItems([]);
    setShowDiscardChangesModal(false);
    navigation.goBack()
  }

  function handleSave() {
    setNewProduction(initProduction);
    setProductionItems([]);
    setSnackbarVisible(true);
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBtnOpt
          navigation={navigation}
          action={handleBack}
        />
      ),
      headerRight: () => (
        <HeaderBtnOpt
          navigation={navigation}
          action={handleSave}
          iconName="save"
        />
      ),
    });
  }, [navigation, handleBack, handleSave]);

  return (
    <GestureContainer
      // rightAction={() => router.push('/(tabs)/warehouse/productions')}
    >
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
            onOk={() => backAndReset()}
            onNotOk={() => setShowDiscardChangesModal(false)}
          />
        </ModalContainer>


        {/* Header */}
        {/* <HeaderContainer>
          <Header
            text="Nuova Produzione"
            leftIconName="chevron-back"
            leftIconPress={() => handleBack()}
            rightIconName="save-outline"
            rightIconPress={() => handleSave()}
          />
        </HeaderContainer> */}
      
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
    </GestureContainer>
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
    paddingVertical: 10,
  }
});