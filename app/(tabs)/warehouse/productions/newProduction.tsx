import React, { useState } from "react";

import { useNavigation } from "expo-router";

import { BodyContainer } from "@/components/custom/containers/BodyContainer";
import { ModalContainer } from "@/components/custom/containers/ModalContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import type { Production } from "@/types/Production";

import { initProduction } from "@/types/Production";

import { MyAlert } from "@/components/custom/MyAlert";

import AddProductModal from "@/components/custom/modals/AddProductModal";

import { ProductionForm } from "@/components/custom/production/ProductionForm";

import { useSnackbar } from "@/components/SnackbarProvider";
import { useNewItemHeader } from "@/hooks/useNewItemHeader";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { Keyboard } from "react-native";

import uuid from "react-native-uuid";
import { LazyContainer } from "@/components/custom/containers/LazyContainer";

export default function NewProduction() {
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  const [newProduction, setNewProduction] = useState<Production>(initProduction);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  const { protectedAction: handleSave } = useProtectedAction(async () => {
    Keyboard.dismiss();
    if (!checkProductionValidity()) {
      setShowMandatoryBorders(true);
      showSnackbar("I campi evidenziati sono obbligatori");
    } else {
      setShowMandatoryBorders(false);
      setNewProduction(initProduction);
      showSnackbar("Nuova produzione creata");
      navigation.goBack();
    }
  });

  const { protectedAction: handleBack } = useProtectedAction(async () => {
    if (newProduction !== initProduction) {
      setShowDiscardChangesModal(true);
      return;
    }
    navigation.goBack();
  });

  useNewItemHeader({
    navigation,
    title: "Nuova produzione",
    onSave: handleSave,
    onBack: handleBack,
  });

  function handleItemAdd(selectedId: string) {
    setNewProduction((prev) => {
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
          },
        ],
      };
    });
  }

  function checkProductionValidity(): boolean {
    return true;
  }

  function backAndReset() {
    setNewProduction(initProduction);
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
          <ProductionForm
            item={newProduction}
            setItem={setNewProduction}
          />
        </LazyContainer>
      </BodyContainer>

    </PageContainer>
  );
}
