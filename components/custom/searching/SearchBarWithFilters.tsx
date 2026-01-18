import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';
import { SearchBar } from './SearchBar';

type SearchBarWithFiltersProps = {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
};

export function SearchBarWithFilters({
  placeholder,
  text,
  setText,
  showFilter,
  setShowFilter,
}: SearchBarWithFiltersProps) {
  const color = useColor();

  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <SearchBar
          placeholder={placeholder}
          text={text}
          setText={setText}
          style={{ flex: 1 }}
        />

        <Pressable
          onPress={() => setShowFilter(true)}
          style={{
            backgroundColor: color.searchBackground,
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="filter" size={25} color={color.icon} />
        </Pressable>
      </View>
    </View>
  );
}
