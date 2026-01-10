import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { FlatList } from 'react-native';

import type { Expense } from '@/types/Expense';
import { initExpense } from '@/types/Expense';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { ExpenseCard } from '@/components/custom/expense/ExpenseCard';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';

import { getAllExpenses } from '@/components/api/expensesApi';

import { GestureContainer } from '@/components/custom/GestureContainer';
import { useSnackbar } from '@/components/SnackbarProvider';

export default function Expenses() {
  
  const router = useRouter();
  const navigation = useNavigation();
    
  const { showSnackbar } = useSnackbar();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);

  const expenses = getAllExpenses();

  const [expense, setExpense] = useState<Expense>(expenses.find(item => item.id === editingItemId) ?? initExpense);

  const [expensesToDisplay, setExpensesToDisplay] = useState<Expense[]>(expenses);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExpensesToDisplay(expenses.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);
  
  function startEditingItem(itemId: string) {
    setExpense(expensesToDisplay.find(item => item.id === itemId) ?? initExpense);
    setEditingItemId(itemId);
    setItemEditModalVisible(true);
  }

  function stopEditing() {
    setEditingItemId(null);
  }

  return (
    <GestureContainer
      // leftAction={() => router.push('/(tabs)/warehouse/newProduct')}
      rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Editing Modal */}
        {/* <ModalContainer visible={itemEditModalVisible && expense !== null}>
          <ProductEditModal
            modalVisible={itemEditModalVisible}
            setModalVisible={setItemEditModalVisible}
            product={expense}
            onSave={(updatedProduct: Product) => {
              showSnackbar('Articolo modificato');
            }}
            onDiscard={() => {
              stopEditing();
            }}
          />
        </ModalContainer> */}

        {/* Body */}
        <BodyContainer>
          <SearchBarWithFilters
            placeholder="Cerca spesa..."
            text={searchText}
            setText={setSearchText}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
          <LazyContainer>
            <FlatList
              data={expensesToDisplay}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ExpenseCard
                  expense={item}
                  startEditingItem={startEditingItem}
                />
              )}
              contentContainerStyle={{
                gap: 10
              }}
            />
          </LazyContainer>

        </BodyContainer>

      </PageContainer>
    </GestureContainer>
  );
}