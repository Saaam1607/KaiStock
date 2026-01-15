
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';

type FormItemGenericProps = {
  label: string;
  children: React.ReactNode;
};

export function FormItemGeneric({ label, children }: FormItemGenericProps) {

  const color = useColor();

  return (
    <View>
      <MyText style={[styles.label, { color: color.textLighter }]}>{label}</MyText>
      {children}
    </View>   
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
});