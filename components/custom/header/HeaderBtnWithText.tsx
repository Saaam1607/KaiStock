import { useColor } from '@/hooks/use-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const HeaderBtnWithText = memo(({ action, iconName = "arrow-back", text }: any) => {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={action}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}
    >
      <Text style={{ color: color.icon, fontWeight: 'bold' }}>{text}</Text>
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
});
HeaderBtnWithText.displayName = "HeaderBtnWithText";

export default HeaderBtnWithText;