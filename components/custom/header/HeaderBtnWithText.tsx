import { TouchableOpacity } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';

const HeaderBtnWithText = memo(({ action, iconName = "arrow-back", text }: any) => {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={action}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}
    >
      <MyText style={{ color: color.icon, fontWeight: 'bold' }}>{text}</MyText>
      <Ionicons name={iconName as any} size={28} color={color.icon} />
    </TouchableOpacity>
  );
});
HeaderBtnWithText.displayName = "HeaderBtnWithText";

export default HeaderBtnWithText;