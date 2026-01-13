import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { useColor } from '@/hooks/use-color';

const HeaderBtn = memo(({ action, iconName = "arrow-back" }: any) => {
  const color = useColor();
  return (
    <TouchableOpacity onPress={action} style={{ paddingHorizontal: 10 }}>
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
});

HeaderBtn.displayName = "HeaderBtn";

export default HeaderBtn;