import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, KeyboardTypeOptions } from 'react-native';


import { useColor } from '@/hooks/use-color';

type FormItemProps = {
  label: string;
  input: string;
  oldInput?: string;
  onInputChange: (value: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  multiLine?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export function FormItem({ label, input, oldInput, onInputChange, inputStyle, multiLine = false, keyboardType='default' }: FormItemProps) {

  const color = useColor();

  return (
    <View>
      <Text style={[styles.label, { color: color.textLighter }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          inputStyle,
          { color: color.text, borderColor: color.inputBorderColor },
          oldInput && oldInput !== input && { borderColor: color.inputChangedBorderColor, borderWidth: 2 },
        ]}
        value={input}
        onChangeText={text => onInputChange(text)}
        multiline = {multiLine}
        keyboardType={keyboardType}
      />
    </View>   
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
  }
});