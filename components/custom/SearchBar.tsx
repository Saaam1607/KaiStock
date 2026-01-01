import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type SearchBarProps = {
  placeholder: string;
  text: string;
  setText: (value: string) => void;
};

export function SearchBar({ placeholder, text, setText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={25} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
      />
      {text.length > 0 && (
        <Ionicons
          name="close"
          size={25}
          color="#888"
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
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    gap: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
