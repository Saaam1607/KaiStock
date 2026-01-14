import React, { useState } from 'react';

import { useNavigation } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import type { SoldProduct } from '@/types/SoldProduct';

import { getProductFromId } from '@/components/api/productsApi';

import { initReservation, Reservation } from '@/types/Reservation';

import { MyAlert } from '@/components/custom/MyAlert';

import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { ReservationForm } from '@/components/custom/reservation/ReservationForm';

import { useSnackbar } from '@/components/SnackbarProvider';

import { useProtectedAction } from '@/hooks/useProtectedAction';
import { useNewItemHeader } from '@/hooks/useNewItemHeader';
import { Keyboard } from 'react-native';

export default function NewReservation() {
  
  const navigation = useNavigation();
  
  const { showSnackbar } = useSnackbar();

  const [newReservation, setNewReservation] = useState<Reservation>(initReservation);
  const [soldProductItems, setSoldProductItems] = useState<SoldProduct[]>([]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  const { protectedAction: handleSave } = useProtectedAction(async () => {
    Keyboard.dismiss();
    if (!checkReservationValidity()) {
      setShowMandatoryBorders(true);
      showSnackbar('I campi evidenziati sono obbligatori');
    } else {
      setShowMandatoryBorders(false);
      setNewReservation(initReservation);
      setSoldProductItems([]);
      showSnackbar('Nuova prenotazione creata');
      navigation.goBack()
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newReservation !== initReservation || soldProductItems.length > 0) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack()
  });

  useNewItemHeader({
    navigation,
    title: 'Nuova prenotazione',
    onSave: handleSave,
    onBack: handleBack,
  });

  function checkReservationValidity(): boolean {
    return true;
  }

  function handleItemAdd(selectedIds: string[]) {
    showSnackbar('Articoli aggiunti');
    
    selectedIds.map(id => {
      if (!soldProductItems.find(item => item.product_id === id)) {
        const product = getProductFromId(id);
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
    setNewReservation(initReservation);
    setSoldProductItems([]);
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
        <ReservationForm
          reservation={newReservation}
          setReservation={setNewReservation}
          soldProductItems={soldProductItems}
          setSoldProductItems={setSoldProductItems}
          setShowAddProductModal={setShowAddProductModal}
        />
      </BodyContainer>
    
    </PageContainer>
  )
}