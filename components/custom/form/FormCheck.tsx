import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


import { useColor } from '@/hooks/use-color';

type FormCheckProps = {
  label: string;
  input: boolean;
  oldInput?: boolean;
  onInputChange: (value: boolean) => void;
  inputStyle?: StyleProp<TextStyle>;
  showMandatoryBorders?: boolean
};

export function FormCheck({ label, input, oldInput, onInputChange, inputStyle, showMandatoryBorders }: FormCheckProps) {

  const color = useColor();

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Text style={[styles.label, { color: color.textLighter }]}>{label}</Text>
      <Pressable
        onPress={() => onInputChange(!input)}
        style={[
          styles.box,
          {
            borderColor: color.inputBorderColor,
            backgroundColor: input ? color.green : 'transparent',
          },
        ]}
      >
        {input && (
          <Ionicons name="checkmark" size={22} color="white" />
        )}
      </Pressable>
    </View>   
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  box: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});