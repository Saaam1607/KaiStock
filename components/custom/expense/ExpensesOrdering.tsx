
import { View } from 'react-native';

import { SortItem } from '../SortItem';

type ExpensesOrderingProps = {
  sortKey: string;
  setSortKey: (key: string) => void;
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (order: 'asc' | 'desc') => void;
};

export function ExpensesOrdering({ sortKey, sortOrder='desc', setSortKey, setSortOrder }: ExpensesOrderingProps) {

  return (
    <View style={{ flexDirection: 'column', gap: 10 }} >
      <SortItem
        label="Data"
        sortValue="date"
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <SortItem
        label="Prezzo"
        sortValue="price"
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <SortItem
        label="Titolo"
        sortValue="title"
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </View>
  );
}
