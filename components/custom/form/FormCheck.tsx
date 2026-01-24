import React from 'react';

import { StyleProp, StyleSheet, TextStyle, View, Pressable } from 'react-native';
import MyText from '../generic/MyText';

import Ionicons from '@expo/vector-icons/Ionicons';

import MyCheck from '../generic/MyCheck';

import { useColor } from '@/hooks/use-color';

type FormCheckProps = {
  label: string;
  labelOnRight?: boolean;
  input: boolean;
  oldInput?: boolean;
  onInputChange: (value: boolean) => void;
  inputStyle?: StyleProp<TextStyle>;
  showMandatoryBorders?: boolean
};

export function FormCheck({ label, labelOnRight = false, input, oldInput, onInputChange, inputStyle, showMandatoryBorders }: FormCheckProps) {

  const color = useColor();

  return (
    <View style={[
      { flexDirection: 'row', gap: 10 },
      labelOnRight && { flexDirection: 'row-reverse', justifyContent: 'flex-end' },
    ]}>
      <MyText style={[styles.label, { color: color.textLighter }]}>{label}</MyText>
      <View style={{ justifyContent: 'center', alignItems: 'center' }} >
        <MyCheck input={input} onInputChange={onInputChange} />
      </View>
      
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
  },
});