import React, { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { FlatList, View } from "react-native";

import type { Expense } from "@/types/Expense";

import { BodyContainerWithSearchAndFilters } from "@/components/custom/containers/BodyContainerWithSearchAndFilters";
import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import { ExpenseCard } from "@/components/custom/expense/ExpenseCard";
import { ItemEditModal } from "@/components/custom/ItemEditModal";

import { getSortedItemsToDisplay } from "@/components/custom/expense/expensesSort";

import ExpenseForm from "@/components/custom/expense/ExpenseForm";

import { deleteExpense, editExpense, getAllExpenses } from "@/components/api/expensesApi";
import { useCrudActions } from "@/hooks/useCrudActions";

import { ExpensesOrdering } from "@/components/custom/expense/ExpensesOrdering";

export default function Expenses() {
  
  const [expenses, setExpenses] = useState<Expense[]>(getAllExpenses());
  const [expensesToDisplay, setExpensesToDisplay] = useState<Expense[]>(expenses);

  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const { updateItem, deleteItemWithConfirm } = useCrudActions<Expense>({
    setItems: setExpenses,
    updateApi: editExpense,
    deleteApi: deleteExpense,
    messages: {
      updateSuccess: "Spesa modificata",
      deleteSuccess: "Spesa eliminata",
      error: "Si è verificato un errore",
      deleteConfirm: (label) =>
        `Sei sicuro di voler eliminare la spesa "${label}"?`,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const all = getAllExpenses();
      setExpenses([...all]);
    }, []),
  );

  return (
    <PageContainer>
      <ItemEditModal<Expense>
        item={expenseToEdit}
        formComponent={ExpenseForm}
        onSave={(updatedExpense) => {
          updateItem(updatedExpense);
          setExpenseToEdit(null);
        }}
        onClose={() => setExpenseToEdit(null)}
      />

      <BodyContainerWithSearchAndFilters<Expense>
        items={expenses}
        setItemsToDisplay={setExpensesToDisplay}
        getSortedItems={getSortedItemsToDisplay}
        searchingField="title"
        orderingComponent={ExpensesOrdering}
      >
        <LazyContainer>
          <FlatList
            data={expensesToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseCard
                expense={item}
                startEditingItem={() => setExpenseToEdit(item)}
                deleteItem={deleteItemWithConfirm}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </LazyContainer>
      </BodyContainerWithSearchAndFilters>
    </PageContainer>
  );
}
