import React, { useState, useEffect } from 'react';

import { useNavigation } from 'expo-router';

import { Keyboard, Text } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { Product } from '@/types/Product';
import type { SoldProduct } from '@/types/SoldProduct';

import { initSale, Sale } from '@/types/Sale';

import { MyAlert } from '@/components/custom/MyAlert';

// import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { AddSoldItemModal } from '@/components/custom/sale/AddSoldItemModal';
import { SaleForm } from '@/components/custom/sale/SaleForm';

import { GestureContainer } from '@/components/custom/GestureContainer';
import { HeaderBtnOpt } from './_layout';
import { useSnackbar } from '@/components/SnackbarProvider';

import { getProduct } from '@/components/utils/getProduct';

export default function NewSale() {
  
  const navigation = useNavigation();
  
  const { showSnackbar } = useSnackbar();

  const [newSale, setNewSale] = useState<Sale>(initSale);
  const [soldProductItems, setSoldProductItems] = useState<SoldProduct[]>([]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  function handleItemAdd(selectedIds: string[]) {
    showSnackbar('Articoli aggiunti');
    
    selectedIds.map(id => {
      if (!soldProductItems.find(item => item.product_id === id)) {
        const product = getProduct(id);
        if (product) {
          setSoldProductItems(prev => [...prev, { product_id: id, quantity: 0, unit_price: product.price, uom: product.uom, weight: 0 }]);
        }
      }
    });

    soldProductItems.map(item => {
      if (!selectedIds.includes(item.product_id)) {
        setSoldProductItems(prev => prev.filter(i => i.product_id !== item.product_id));
      }
    });
  }

  function backAndReset() {
    setNewSale(initSale);
    setSoldProductItems([]);
    setShowDiscardChangesModal(false);
    navigation.goBack()
  }

  function checkProducValidity(): boolean {
    if (newSale.to === '') return false;
    return true;
  }

  useEffect(() => {

    function handleSave() {
      Keyboard.dismiss();
      if (!checkProducValidity()) {
        setShowMandatoryBorders(true);
        showSnackbar('I campi evidenziati sono obbligatori');
      } else {
        setShowMandatoryBorders(false);
        setNewSale(initSale);
        showSnackbar('Nuova vendita creata');
        navigation.goBack()
      }
    }

    function handleBack() {
      if (newSale !== initSale || soldProductItems.length > 0) {
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
        <HeaderBtnOpt
          navigation={navigation}
          action={handleSave}
          iconName="save"
        />
      ),
    });
  }, [navigation]);

  function handleBodyItemSubmit(product: Product, weight: number, quantity: number) {
    console.log(product, weight, quantity);

    const newSoldProduct: SoldProduct = {
      product_id: product.id,
      quantity,
      unit_price: product.price,
      uom: product.uom,
      weight,
    };

    setSoldProductItems(prev => [...prev, newSoldProduct]);

    setShowAddProductModal(false);
  }

  return (
    <GestureContainer
      rightAction={() => navigation.goBack()}
    >
      <PageContainer>
      
        {/* Modal */}
        <ModalContainer visible={showAddProductModal}>
          <AddSoldItemModal
            modalVisible={showAddProductModal}
            setModalVisible={setShowAddProductModal}
            handleSubmit={handleBodyItemSubmit}
            selectedIds={soldProductItems.map(item => item.product_id)}
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
          <SaleForm
            sale={newSale}
            setSale={setNewSale}
            soldProductItems={soldProductItems}
            setSoldProductItems={setSoldProductItems}
            setShowAddProductModal={setShowAddProductModal}
            showMandatoryBorders={showMandatoryBorders}
          />
        </BodyContainer>
      
      </PageContainer>
    </GestureContainer>
  )
}