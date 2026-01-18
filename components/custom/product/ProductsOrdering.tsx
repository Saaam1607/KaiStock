
import { View, Text } from 'react-native';

import { SortItem } from '../SortItem';

type ProductsOrderingProps = {
  sortKey: string;
  setSortKey: (key: string) => void;
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (order: 'asc' | 'desc') => void;
};

export function ProductsOrdering({ sortKey, sortOrder='desc', setSortKey, setSortOrder }: ProductsOrderingProps) {

  return (
    <View style={{ flexDirection: 'column', gap: 10 }} >
      <SortItem
        label="Nome"
        sortValue="name"
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </View>
  );
}
