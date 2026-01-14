import React, { useState, useEffect } from 'react';

import { useNavigation } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { Production } from '@/types/Production';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import { initProduction } from '@/types/Production';

import { MyAlert } from '@/components/custom/MyAlert';

import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { ProductionForm } from '@/components/custom/produce/ProductionForm';

import { GestureContainer } from '@/components/custom/GestureContainer';


import { useSnackbar } from '@/components/SnackbarProvider';
import { Keyboard } from 'react-native';
import { useProtectedAction } from '@/hooks/useProtectedAction';
import { useNewItemHeader } from '@/hooks/useNewItemHeader';

export default function NewProduction() {
  
  const navigation = useNavigation();
  
  const { showSnackbar } = useSnackbar();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);
  const [productionItems, setProductionItems] = useState<ProductQuantityItem[]>([]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  const { protectedAction: handleSave } = useProtectedAction(async () => {
    Keyboard.dismiss();
    if (!checkProductionValidity()) {
      setShowMandatoryBorders(true);
      showSnackbar('I campi evidenziati sono obbligatori');
    } else {
      setShowMandatoryBorders(false);
      setNewProduction(initProduction);
      setProductionItems([]);
      showSnackbar('Nuova produzione creata');
      navigation.goBack()
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newProduction !== initProduction || productionItems.length > 0) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack()
  });

  useNewItemHeader({
    navigation,
    onSave: handleSave,
    onBack: handleBack,
  });

  function handleItemAdd(selectedIds: string[]) {
    showSnackbar('Articoli aggiunti');
    
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

  function checkProductionValidity(): boolean {
    return true;
  }

  function backAndReset() {
    setNewProduction(initProduction);
    setProductionItems([]);
    setShowDiscardChangesModal(false);
    navigation.goBack()
  }

  return (
    <GestureContainer
      rightAction={() => navigation.goBack()}
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

        {/* Body */}
        <BodyContainer>
          <ProductionForm
            production={newProduction}
            setProduction={setNewProduction}
            productionItems={productionItems}
            setProductionItems={setProductionItems}
            setShowAddProductModal={setShowAddProductModal}
          />
        </BodyContainer>
      
      </PageContainer>
    </GestureContainer>
  )
}