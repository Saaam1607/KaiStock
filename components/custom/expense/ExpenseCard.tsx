import React from 'react';

import { Expense } from '@/types/Expense';

import { Card, CardDate, CardDescription, CardTitle } from '../containers/Card';

type ExpenseCardProps = {
  expense: Expense;
  startEditingItem: (itemName: string) => void;
  deleteItem?: (itemId: string, itemLabel: string) => void;
};

export function ExpenseCard({ expense, startEditingItem, deleteItem }: ExpenseCardProps) {

  function handleEdit() {
    startEditingItem(expense.id);
  }

  function handleDelete() {
    if (deleteItem) deleteItem(expense.id, expense.title);
  }

  return (
    <Card
      isEditable={true}
      editAction={handleEdit}
      isDeletable={true}
      deleteAction={handleDelete}
    >
      <CardTitle value={expense.title} />
      <CardDescription value={expense.description} />
      <CardDate value={expense.date} />
      <CardTitle value={expense.price.toString() + " €"} />
    </Card>
  );
}