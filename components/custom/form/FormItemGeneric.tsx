
import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, KeyboardTypeOptions } from 'react-native';

import { useColor } from '@/hooks/use-color';

type FormItemGenericProps = {
  label: string;
  children: React.ReactNode;
};

export function FormItemGeneric({ label, children }: FormItemGenericProps) {

  const color = useColor();

  return (
    <View>
      <Text style={[styles.label, { color: color.textLighter }]}>{label}</Text>
      {children}
    </View>   
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});