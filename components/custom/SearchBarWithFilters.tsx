import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import { useColor } from '@/hooks/use-color';

import { SearchBar } from './SearchBar';

type SearchBarWithFiltersProps = {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  filtersComponent?: React.ReactNode;
};

export function SearchBarWithFilters({ placeholder, text, setText, showFilter, setShowFilter, filtersComponent }: SearchBarWithFiltersProps) {
  
  const color = useColor();

  return (
    <View style={{ gap: 10 }}>
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
            backgroundColor: showFilter ? color.green : color.searchBackground,
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
              size={25}
              color={color.icon}
            />
          </View>
        </TouchableHighlight>
      </View>

      {/* Filters View */}
      {showFilter && (
        <View>
          {filtersComponent}
        </View>
      )}
      
    </View>
  );
}