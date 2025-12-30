import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateInput from '../DateInput';

import type { Production } from '@/types/Production';

type ProduceFormProps = {
  production: Production;
  setProduction: (product: Production) => void;
};

export default function ProduceForm({ production, setProduction }: ProduceFormProps) {
  


  return (
    <View style={styles.form}>
      <Text style={styles.label}>Titolo</Text>
      <TextInput
        style={[
          styles.input,
        ]}
        value={production.title}
        onChangeText={text => setProduction({ ...production, title: text })}
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[
          styles.input, 
          { height: 60 },
        ]}
        value={production.notes}
        onChangeText={text => setProduction({ ...production, notes: text })}
        multiline
      />

      <DateInput
        date={production.date}
        setDate={date => setProduction({ ...production, date: date })}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
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
  },
  inputChanged: {
    borderColor: 'orange',
    borderWidth: 2,
  }
});
