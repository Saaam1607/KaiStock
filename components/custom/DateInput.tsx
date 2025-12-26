import React from 'react';
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import Ionicons from '@expo/vector-icons/Ionicons';

type DateInputProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DateInput({ date, setDate }: DateInputProps) {
  
  const [visible, setVisible] = React.useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setVisible(false);
    if (currentDate)
      setDate(currentDate);
  };

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View>
      <Text style={styles.label}>Data</Text>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.date_input}>
          <TextInput
            style={styles.input}
            value={formatDate(date)}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons
            name="calendar-outline"
            size={32}
            color="grey"
          />
        </View>
      </Pressable>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
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
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    flex: 1,
  },
});