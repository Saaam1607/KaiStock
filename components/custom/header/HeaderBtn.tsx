import { TouchableOpacity } from 'react-native';
import MyText from '../generic/MyText';

import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { useColor } from '@/hooks/use-color';

type HeaderBtnProps = {
  iconName?: string;
  text?: string;
  action?: () => void;
};


const HeaderBtn = memo(({ iconName = "arrow-back", text, action }: HeaderBtnProps) => {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={action || (() => {})}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}
    >
      {text && (
        <MyText style={{ color: color.icon, fontWeight: 'bold' }}>{text}</MyText>
      )}
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
});

HeaderBtn.displayName = "HeaderBtn";

export default HeaderBtn;