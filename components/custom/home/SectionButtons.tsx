import React from 'react';

import { View, Text, Pressable } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';

type SectionButtonsProps = {
  buttons: {label: string, isSelected: boolean, action: () => void}[];
};

export function SectionButtons({ buttons }: SectionButtonsProps) {
  
  const color = useColor();
  
  return (
    <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
      
      {buttons.map((button, index) => (
        <Pressable
          key={index}
          onPress={button.action}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: button.isSelected ? 'rgba(14, 19, 18, 0.5)' : 'transparent',
            borderWidth: 1,
            borderColor: 'rgb(78, 96, 100)',
          }}
        >
          <MyText
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: button.isSelected ? 'rgb(200, 225, 230)' : 'rgb(200, 225, 230)',
            }}
          >
            {button.label}
          </MyText>  
        </Pressable>
      ))}
    </View>
  );
}