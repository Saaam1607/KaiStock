import React, { useEffect, useState } from 'react';

import { useNavigation } from 'expo-router';

import { Keyboard } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';

import type { Expense } from '@/types/Expense';
import { initExpense } from '@/types/Expense';

import { MyAlert } from '@/components/custom/MyAlert';

import ExpenseForm from '@/components/custom/expense/ExpenseForm';

import { GestureContainer } from '@/components/custom/GestureContainer';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import { useSnackbar } from '@/components/SnackbarProvider';

import { createExpense } from '@/components/api/expensesApi';

export default function NewExpense() {
  
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  const [newExpense, setNewExpense] = useState<Expense>(initExpense);

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);

  const [showMandatoryBorders, setShowMandatoryBorders] = useState(false);

  function backAndReset() {
    setNewExpense(initExpense);
    setShowDiscardChangesModal(false);
    navigation.goBack()
  }

  function checkExpenseValidity(): boolean {
    if (newExpense.title === '') return false;
    return true;
  }

  useEffect(() => {

    function handleSave() {
      Keyboard.dismiss();
      if (!checkExpenseValidity()) {
        setShowMandatoryBorders(true);
        showSnackbar('I campi evidenziati sono obbligatori');
      } else {
        createExpense(newExpense)
        .then(() => {
          setShowMandatoryBorders(false);
          showSnackbar('Articolo creato');
          setNewExpense(initExpense);
          navigation.goBack()
        })
        .catch(() => showSnackbar('Si è verificato un errore'));
      }
    }

    function handleBack() {
      if (newExpense !== initExpense) {
        setShowDiscardChangesModal(true);
        return;
      }
      navigation.goBack()
    }

    navigation.setOptions({
      headerLeft: () => (
        <HeaderBtn
          navigation={navigation}
          action={handleBack}
        />
      ),
      headerRight: () => (
        <HeaderBtnWithText
          navigation={navigation}
          action={handleSave}
          iconName="save"
          text="Salva"
        />
      ),
    });
  }, [navigation, newExpense]);

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
          <LazyContainer>
            <ExpenseForm
              expense={newExpense}
              setExpense={setNewExpense}
              showMandatoryBorders={showMandatoryBorders}
            />
          </LazyContainer>
        </BodyContainer>
      
        {/* Notifications */}
      
      </PageContainer>
    </GestureContainer>
  )
}