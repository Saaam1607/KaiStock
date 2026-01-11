
import { View } from 'react-native';
import { Button } from 'react-native';

import { FormCheck } from '../form/FormCheck';

type ExpensesFiltersProps = {
  sortKey: 'date' | 'title' | 'price';
  setSortKey: (key: 'title' | 'date' | 'price') => void;
};

export function ExpensesFilters({ sortKey, setSortKey }: ExpensesFiltersProps) {
  return (
    <View style={{ flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      <FormCheck
        label="Data"
        labelOnRight
        input={sortKey === 'date'}
        onInputChange={() => {
          setSortKey('date')
        }}
      />
      <FormCheck
        label="Prezzo"
        labelOnRight
        input={sortKey === 'price'}
        onInputChange={() => {
          setSortKey('price')
        }}
      />
      <FormCheck
        label="Titolo"
        labelOnRight
        input={sortKey === 'title'}
        onInputChange={() => {
          setSortKey('title')
        }}
      />
    </View>
  );
}
