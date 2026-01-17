import React, { useState, useCallback, useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { FlatList, View } from 'react-native';

import type { Expense } from '@/types/Expense';
import { initExpense } from '@/types/Expense';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { ExpenseCard } from '@/components/custom/expense/ExpenseCard';
import { ExpenseEditModal } from '@/components/custom/expense/ExpenseEditModal';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { ExpensesOrdering } from '@/components/custom/expense/ExpensesOrdering';

import { getAllExpenses, editExpense, deleteExpense } from '@/components/api/expensesApi';

import { useSnackbar } from '@/components/SnackbarProvider';
import { useAlert } from '@/components/providers/AlertProvider';

import { BottomSheet } from '@/components/custom/BottomSheet';

export default function Expenses() {
  
  const { showSnackbar } = useSnackbar();
  const { showAlert } = useAlert();

  const [expenses, setExpenses] = useState<Expense[]>(getAllExpenses());  
  const [expense, setExpense] = useState<Expense>(expenses.find(item => item.id === editingItemId) ?? initExpense);

  const [sortKey, setSortKey] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);
  
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [expensesToDisplay, setExpensesToDisplay] = useState<Expense[]>([]);

  useEffect(() => {
    if (!showFilter) {
      setExpensesToDisplay(() => {
        const sortedExpenses = getSortedExpensesToDisplay();
        return sortedExpenses.filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
  }, [expenses, searchText, showFilter]);

  useFocusEffect(
    useCallback(() => {
      const all = getAllExpenses();
      setExpenses([...all]);
    }, [])
  );

  function getSortedExpensesToDisplay(): Expense[] {
    let sortedExpenses = [...expenses];
    switch (sortKey) {
      case 'date':
        sortedExpenses.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case 'title':
        sortedExpenses.sort((a: Expense, b: Expense) => a.title.localeCompare(b.title));
        break;
      case 'price':
        sortedExpenses.sort((a: Expense, b: Expense) => a.price - b.price);
        break;
      default:
        break;
    }
    if (sortOrder === 'desc') {
      sortedExpenses.reverse();
    }
    return sortedExpenses;
  }

  function startEditingItem(itemId: string) {
    setExpense(expensesToDisplay.find(item => item.id === itemId) ?? initExpense);
    setEditingItemId(itemId);
    setItemEditModalVisible(true);
  }

  function stopEditing() {
    setEditingItemId(null);
  }

  function updateItem(expense: Expense) {
    editExpense(expense)
    .then(() => {
      setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
      showSnackbar('Spesa modificata');
    })
    .catch(() => {
      showSnackbar('Si è verificato un errore');
    });
  }

  function handleDeleteItem(itemLabel: string, itemId: string) {
    const options = {
      title: "Conferma eliminazione",
      message: `Sei sicuro di voler la spesa "${itemLabel}"?`,
      okText: "Elimina",
      notOkText: "Annulla",
      onOk: () => deleteItem(itemId),
      onNotOk: () => {},
    };
    showAlert(options);
  }

  function deleteItem(itemId: string) {
    deleteExpense(itemId)
    .then(() => {
      setExpenses(prev => prev.filter(e => e.id !== itemId));
      showSnackbar('Spesa eliminata');
    })
    .catch(() => {
      showSnackbar('Si è verificato un errore');
    });
  }

  return (
    <PageContainer>

      {/* Editing Modal */}
      <ModalContainer visible={itemEditModalVisible && expense !== null}>
        <ExpenseEditModal
          modalVisible={itemEditModalVisible}
          setModalVisible={setItemEditModalVisible}
          expense={expense}
          onSave={(updatedExpense: Expense) => {
            updateItem(updatedExpense);
          }}
          onDiscard={() => {
            stopEditing();
          }}
        />
      </ModalContainer>

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
                deleteItem={handleDeleteItem}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </LazyContainer>
      </BodyContainer>

      <BottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        orderingComponent={<ExpensesOrdering sortKey={sortKey} setSortKey={setSortKey} sortOrder={sortOrder} setSortOrder={setSortOrder} />}
        filteringComponent={null}
      />

    </PageContainer>
  );
}