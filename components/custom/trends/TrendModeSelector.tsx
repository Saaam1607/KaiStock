import React from 'react';
import { View, Text, Pressable } from 'react-native';

type TrendMode = 'year' | 'month';

type TrendModeSelectorProps = {
  mode: TrendMode;
  setMode: (mode: TrendMode) => void;
};

export function TrendModeSelector({ mode, setMode }: TrendModeSelectorProps) {

  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
      {(['year', 'month'] as const).map(m => (
        <Pressable
          key={m}
          onPress={() => setMode(m)}
          style={{
            padding: 8,
            borderRadius: 6,
            backgroundColor: mode === m ? '#4f46e5' : '#ddd',
          }}
        >
          <Text style={{ color: mode === m ? 'white' : 'black' }}>
            {m}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
