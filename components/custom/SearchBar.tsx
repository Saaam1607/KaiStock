import React from 'react';

import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type SearchBarProps = {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchBar({ placeholder, text, setText, style }: SearchBarProps) {
  
  const color = useColor();
  
  return (
    <View style={[styles.container, {backgroundColor: color.searchBackground}, style]}>
      <Ionicons name="search" size={25} color={color.icon} />
      <TextInput
        style={[styles.input, { color: color.text }]}
        placeholder={placeholder}
        placeholderTextColor={color.textLighter}
        value={text}
        onChangeText={setText}
      />
      {text.length > 0 && (
        <Ionicons
          name="close"
          size={25}
          color={color.icon}
          onPress={() => setText('')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
