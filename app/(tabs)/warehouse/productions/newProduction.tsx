import React, { useState } from 'react';

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

import { useSnackbar } from '@/components/SnackbarProvider';
import { Keyboard } from 'react-native';
import { useProtectedAction } from '@/hooks/useProtectedAction';
import { useNewItemHeader } from '@/hooks/useNewItemHeader';

import uuid from 'react-native-uuid';

export default function NewProduction() {
  
  const navigation = useNavigation();
  
  const { showSnackbar } = useSnackbar();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);
  // const [productionItems, setProductionItems] = useState<ProductQuantityItem[]>([]);

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
      showSnackbar('Nuova produzione creata');
      navigation.goBack()
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newProduction !== initProduction) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack()
  });

  useNewItemHeader({
    navigation,
    title: 'Nuova produzione',
    onSave: handleSave,
    onBack: handleBack,
  });


  function handleItemAdd(selectedId: string) {
    setNewProduction(prev => ({
      ...prev,
      body: [
        ...prev.body,
        {
          id: uuid.v4().toString(),
          product_id: selectedId,
          quantity: 0,
          weight: 0,
        }
      ]
    }));
  }

  function checkProductionValidity(): boolean {
    return true;
  }

  function backAndReset() {
    setNewProduction(initProduction);
    setShowDiscardChangesModal(false);
    navigation.goBack()
  }

  return (
    <PageContainer>

      {/* Modal */}
      <ModalContainer visible={showAddProductModal}>
        <ProductionAddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
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
          setShowAddProductModal={setShowAddProductModal}
        />
      </BodyContainer>

    </PageContainer>
  )
}