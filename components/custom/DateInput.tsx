import React from 'react';
import { StyleSheet } from 'react-native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


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

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={'date'}
      is24Hour={true}
      onChange={onChange}
    />
  );
}

const styles = StyleSheet.create({
  
});
