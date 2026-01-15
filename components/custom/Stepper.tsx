import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './generic/MyText';


import { useColor } from '@/hooks/use-color';

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
                <MyText style={{ fontWeight: 'bold' }}>
                  {index + 1}
                </MyText>
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
          <MyText style={{ color: color.text }}>Indietro</MyText>
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
          <MyText style={{ color: color.text }}>{step === maxStep ? 'Conferma' : 'Avanti'}</MyText>
        </Pressable>
      </View> */}
    </View> 
  );
}

const styles = StyleSheet.create({
});