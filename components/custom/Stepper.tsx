import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';


import { useColor } from '@/hooks/use-color';

import Ionicons from '@expo/vector-icons/Ionicons';

type StepperProps = {
  content: ReactElement[];
  step: number;
  setStep: (step: number) => void;
};

export function Stepper({ content, step, setStep }: StepperProps) {

  const color = useColor();

  const maxStep = content.length - 1;

  function handleNextStep() {
    if (step < maxStep) {
      setStep(step + 1);
    }
  }

  function handlePreviousStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  return (
    <View style={{ height: '100%', gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {content.map((item, index) => (
          <React.Fragment key={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              {index > 0 && (
                <View
                  style={{
                    width: 30,
                    height: 2,
                    backgroundColor: index <= step ? 'rgb(147, 147, 147)' : 'rgb(79, 79, 79)',
                  }}
                />
              )}
              <View
                style={{
                  borderColor: index === step ? 'rgba(203, 203, 203, 1)' : 'rgb(79, 79, 79)',
                  backgroundColor: index <= step ? 'rgb(147, 147, 147)' : 'transparent',
                  borderWidth: 2,
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  {index + 1}
                </Text>
              </View>
            </View>

          </React.Fragment>
        ))}
      </View>
      <View style={{ flex: 1}}>
        {content[step]}
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1 }}>
        <Pressable
          onPress={handlePreviousStep}
          style={{
            height: 30,
            width: 100,
            backgroundColor: 'rgba(79, 79, 79, 1)',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: step === 0 ? 0.5 : 1
          }}
        >
          <Text style={{ color: color.text }}>Indietro</Text>
        </Pressable>
        <Pressable
          onPress={handleNextStep}
          style={{
            height: 30,
            width: 100,
            backgroundColor: 'rgba(79, 79, 79, 1)',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: color.text }}>{step === maxStep ? 'Conferma' : 'Avanti'}</Text>
        </Pressable>
      </View> */}
    </View> 
  );
}

const styles = StyleSheet.create({
});