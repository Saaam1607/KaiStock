import React, { useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { Keyboard } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { MyAlert } from '@/components/custom/MyAlert';

import ProductForm from '@/components/custom/product/ProductForm';

import { useSnackbar } from '@/components/SnackbarProvider';
import { useProtectedAction } from '@/hooks/useProtectedAction';
import { useNewItemHeader } from '@/hooks/useNewItemHeader';

export default function NewProduct() {
  
  const navigation = useNavigation();
  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const [newProduct, setNewProduct] = useState<Product>(initProduct);

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  const { protectedAction: handleSave } = useProtectedAction(async () => {
    Keyboard.dismiss();
    if (!checkProductValidity()) {
      setShowMandatoryBorders(true);
      showSnackbar('I campi evidenziati sono obbligatori');
    } else {
      setShowMandatoryBorders(false);
      setNewProduct(initProduct);
      showSnackbar('Nuovo articolo creato');
      navigation.goBack()
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newProduct !== initProduct) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack()
  });

  useNewItemHeader({
    navigation,
    title: 'Nuovo articolo',
    onSave: handleSave,
    onBack: handleBack,
  });

  function backAndReset() {
    setNewProduct(initProduct);
    setShowDiscardChangesModal(false);
    router.back();
  }

  function checkProductValidity(): boolean {
    if (newProduct.name === '') return false;
    return true;
  }

  return (
    <PageContainer>
    
      {/* Modal */}
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
        <ProductForm
          item={newProduct}
          setItem={setNewProduct}
          showMandatoryBorders={showMandatoryBorders}
        />
      </BodyContainer>
    
      {/* Notifications */}
    
    </PageContainer>
  )
}