import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MyTextInput from './generic/MyTextInput';

import { useColor } from '@/hooks/use-color';

type WeightEditorProps = {
  weight: number;
  setWeight: (weight: number) => void;
};

export function WeightEditor({
  weight,
  setWeight,
}: WeightEditorProps) {

  const color = useColor();

  const [tmpWeightText, setTmpWeightText] = useState(weight.toString());
  
  useEffect(() => {
    setWeight(tmpWeightText === '' ? 0 : parseFloat(tmpWeightText.replace(',', '.')));
  }, [tmpWeightText]);

  return (
    <View style={containerStyles.weightButtons}>
      <View style={[containerStyles.weight, { borderColor: color.inputBorderColor, borderWidth: 1 }]}>
        <MyTextInput
          style={[
            styles.input,
            { color: color.text }
          ]}
          value={tmpWeightText}
          onChangeText={(text) => {
            if (/^\d*(,\d*)?$/.test(text)) {
              setTmpWeightText(text);
            }
          }}
          keyboardType="decimal-pad"
      />
      </View>
    </View>
  );
}

const containerStyles = StyleSheet.create({
  weightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  weight: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  }
});

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    fontSize: 15,
    width: 120,
    height: 40,
    textAlign: 'center',
  },
});