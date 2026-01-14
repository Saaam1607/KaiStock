import { TouchableOpacity, Text } from 'react-native';
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
        <Text style={{ color: color.icon, fontWeight: 'bold' }}>{text}</Text>
      )}
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
});

HeaderBtn.displayName = "HeaderBtn";

export default HeaderBtn;