import { useColor } from '@/hooks/use-color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

type MyCheckProps = {
  input: boolean;
  onInputChange: (value: boolean) => void;
};

export default function MyCheck({ input, onInputChange}: MyCheckProps) {
  
  const color = useColor();

  return (
    <Pressable
      onPress={() => onInputChange(!input)}
      style={{
        width: 30,
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.inputBorderColor,
        backgroundColor: input ? color.green : 'transparent',
      }}
    >
      {input && (
        <Ionicons name="checkmark" size={22} color="white" />
      )}
    </Pressable>
  );
}