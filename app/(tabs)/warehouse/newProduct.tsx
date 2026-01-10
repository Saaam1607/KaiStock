import React, { useEffect, useState } from 'react';

import { useNavigation } from 'expo-router';

import { Keyboard } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { MyAlert } from '@/components/custom/MyAlert';

import ProductForm from '@/components/custom/product/ProductForm';

import { GestureContainer } from '@/components/custom/GestureContainer';
import { HeaderBtnOpt, HeaderBtnWithTextOpt } from './_layout';


import { useSnackbar } from '@/components/SnackbarProvider';

export default function NewProduct() {
  
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  const [newProduct, setNewProduct] = useState<Product>(initProduct);

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  function backAndReset() {
    setNewProduct(initProduct);
    setShowDiscardChangesModal(false);
    navigation.goBack()
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
        navigation.goBack()
      }
    }

    function handleBack() {
      if (newProduct !== initProduct) {
        setShowDiscardChangesModal(true);
        return;
      }
      navigation.goBack()
    }

    navigation.setOptions({
      headerLeft: () => (
        <HeaderBtnOpt
          navigation={navigation}
          action={handleBack}
        />
      ),
      headerRight: () => (
        <HeaderBtnWithTextOpt
          navigation={navigation}
          action={handleSave}
          iconName="save"
          text="Salva"
        />
      ),
    });
  }, [navigation, newProduct]);

  return (
    <GestureContainer
      rightAction={() => navigation.goBack()}
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