import React, { useState } from "react";

import { useNavigation } from "expo-router";

import { Keyboard } from "react-native";

import { BodyContainer } from "@/components/custom/containers/BodyContainer";
import { ModalContainer } from "@/components/custom/containers/ModalContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";


import { initSale, Sale } from "@/types/Sale";

import { MyAlert } from "@/components/custom/MyAlert";

import { SaleForm } from "@/components/custom/sale/SaleForm";

import { useSnackbar } from "@/components/SnackbarProvider";

import { getProductFromId } from "@/components/api/productsApi";

import { useNewItemHeader } from "@/hooks/useNewItemHeader";
import { useProtectedAction } from "@/hooks/useProtectedAction";

import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import AddProductModal from "@/components/custom/modals/AddProductModal";
import uuid from "react-native-uuid";

export default function NewSale() {
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  const [newSale, setNewSale] = useState<Sale>(initSale);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  const { protectedAction: handleSave } = useProtectedAction(async () => {
    Keyboard.dismiss();
    if (!checkSaleValidity()) {
      setShowMandatoryBorders(true);
      showSnackbar("I campi evidenziati sono obbligatori");
    } else {
      setShowMandatoryBorders(false);
      setNewSale(initSale);
      showSnackbar("Nuova vendita creata");
      navigation.goBack();
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newSale !== initSale) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack();
  });

  useNewItemHeader({
    navigation,
    title: "Nuova vendita",
    onSave: handleSave,
    onBack: handleBack,
  });

  function handleItemAdd(selectedId: string) {
    const product = getProductFromId(selectedId);
    if (!product) return;

    setNewSale((prev) => {
      return {
        ...prev,
        id: prev.id || uuid.v4().toString(),
        body: [
          ...prev.body,
          {
            id: uuid.v4().toString(),
            product_id: selectedId,
            quantity: 0,
            weight: 0,
            unit_price: product.price,
            uom: product.uom,
          },
        ],
      };
    });
  }

  function checkSaleValidity(): boolean {
    if (newSale.to === "") return false;
    return true;
  }

  function backAndReset() {
    setNewSale(initSale);
    setShowDiscardChangesModal(false);
    navigation.goBack();
  }

  return (
    <PageContainer>
      <ModalContainer visible={showAddProductModal}>
        <AddProductModal
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

      <BodyContainer>
        <LazyContainer>
          <SaleForm
            item={newSale}
            setItem={setNewSale}
            showMandatoryBorders={showMandatoryBorders}
          />
        </LazyContainer>
      </BodyContainer>
    </PageContainer>
  );
}
