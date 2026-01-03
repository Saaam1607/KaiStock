import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, KeyboardTypeOptions, Pressable } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type FormItemDateProps = {
  label: string;
  input: Date;
  oldInput?: Date;
  onInputChange: (value: Date) => void;
  inputStyle?: StyleProp<TextStyle>;
  multiLine?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export function FormItemDate({ label, input, oldInput, onInputChange, inputStyle, multiLine = false, keyboardType='default' }: FormItemDateProps) {

  const color = useColor();

  const [visible, setVisible] = React.useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setVisible(false);
    if (currentDate)
      onInputChange(currentDate);
  };

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View>
      <Text style={[styles.label, { color: color.textLighter }]}>Data</Text>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.date_input}>
          <TextInput
            style={[
              styles.input,
              inputStyle,
              { color: color.text, borderColor: color.inputBorderColor },
              oldInput && oldInput !== input && { borderColor: color.inputChangedBorderColor, borderWidth: 2 },
            ]}
            value={formatDate(input)}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons
            name="calendar-outline"
            size={32}
            color={color.icon}
          />
        </View>
      </Pressable>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={input}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>   
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  date_input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    flexGrow: 1
  }
});