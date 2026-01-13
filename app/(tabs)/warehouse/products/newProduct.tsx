import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { Keyboard } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { MyAlert } from '@/components/custom/MyAlert';

import ProductForm from '@/components/custom/product/ProductForm';

import { GestureContainer } from '@/components/custom/GestureContainer';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';


import { useSnackbar } from '@/components/SnackbarProvider';

export default function NewProduct() {
  
  const navigation = useNavigation();
  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const [newProduct, setNewProduct] = useState<Product>(initProduct);

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  function backAndReset() {
    setNewProduct(initProduct);
    setShowDiscardChangesModal(false);
    router.back();
  }

  function checkProductValidity(): boolean {
    if (newProduct.name === '') return false;
    return true;
  }

  useEffect(() => {

    function handleSave() {
      Keyboard.dismiss();
      if (!checkProductValidity()) {
        setShowMandatoryBorders(true);
        showSnackbar('I campi evidenziati sono obbligatori');
      } else {
        setShowMandatoryBorders(false);
        setNewProduct(initProduct);
        showSnackbar('Articolo creato');
        router.back();
      }
    }

    function handleBack() {
      if (newProduct !== initProduct) {
        setShowDiscardChangesModal(true);
        return;
      }
      router.back();
    }

    navigation.setOptions({
      headerLeft: () => (
        <HeaderBtn
          action={handleBack}
        />
      ),
      headerRight: () => (
        <HeaderBtnWithText
          action={handleSave}
          iconName="save"
          text="Salva"
        />
      ),
    });
  }, [navigation, newProduct]);

  return (
    <GestureContainer
    >
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
            product={newProduct}
            setProduct={setNewProduct}
            showMandatoryBorders={showMandatoryBorders}
          />
        </BodyContainer>
      
        {/* Notifications */}
      
      </PageContainer>
    </GestureContainer>
  )
}