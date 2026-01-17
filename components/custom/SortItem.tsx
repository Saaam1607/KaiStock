
import { View, Button, Pressable } from 'react-native';

import { FormCheck } from './form/FormCheck';

import { Ionicons } from '@expo/vector-icons';

import { useColor } from '@/hooks/use-color';

type SortItemProps = {
  label: string;
  sortValue: string,
  sortKey: string;
  setSortKey: (key: 'string') => void;
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (order: 'asc' | 'desc') => void;
};

export function SortItem({ label, sortValue, sortKey, setSortKey, sortOrder, setSortOrder }: SortItemProps) {

  const color = useColor();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }} >
      <FormCheck
        label={label}
        labelOnRight
        input={sortKey === sortValue}
        onInputChange={() => {
          setSortKey(sortValue as 'string')
        }}
      />
      {sortKey === sortValue && setSortOrder && setSortOrder && (
        <Pressable
          onPress={() => {setSortOrder && setSortOrder((sortOrder === 'asc' ? 'desc' : 'asc'))}}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name={sortOrder === 'asc' ? "caret-up-circle" : "caret-down-circle" as any} size={35} color={color.text} />
        </Pressable>
      )}
    </View>
  );
}