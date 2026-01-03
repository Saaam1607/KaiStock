import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';

import { SearchBar } from './SearchBar';

type SearchBarWithFiltersProps = {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
};

export function SearchBarWithFilters({ placeholder, text, setText, showFilter, setShowFilter }: SearchBarWithFiltersProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: '100%',
      }}
    >
      <SearchBar
        placeholder={placeholder}
        text={text}
        setText={setText}
        style={{ flex: 1 }}
      />
      <TouchableHighlight
        onPress={() => setShowFilter(!showFilter)}
        underlayColor="transparent"
        style={{
          backgroundColor: '#f0f0f0',
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Ionicons
            name="filter"
            size={30}
            color="#888"
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}