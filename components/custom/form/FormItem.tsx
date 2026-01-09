import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, KeyboardTypeOptions } from 'react-native';


import { useColor } from '@/hooks/use-color';

type FormItemProps = {
  label: string;
  input: string;
  oldInput?: string;
  onInputChange?: (value: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  multiLine?: boolean;
  keyboardType?: KeyboardTypeOptions;
  showMandatoryBorders?: boolean
};

export function FormItem({ label, input, oldInput, onInputChange, inputStyle, multiLine = false, keyboardType='default', showMandatoryBorders }: FormItemProps) {

  const color = useColor();
  const readonly = onInputChange === undefined;

  return (
    <View>
      <Text style={[styles.label, { color: color.textLighter }]}>{label}</Text>
      <TextInput
        editable={!readonly}
        selectTextOnFocus={!readonly}
        style={[
          styles.input, 
          inputStyle,
          { color: readonly ? color.textLighter : color.text  },
          { borderColor: color.inputBorderColor },
          { borderWidth: onInputChange ? 1 : 0 },
          oldInput && oldInput !== input && { borderColor: color.inputChangedBorderColor, borderWidth: 2 },
          showMandatoryBorders && { borderColor: color.red, borderWidth: 2 },
        ]}
        value={input}
        onChangeText={text => onInputChange && onInputChange(text)}
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
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
  }
});