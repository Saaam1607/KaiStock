import { View } from 'react-native';
import MyText from '../generic/MyText';

import HeaderBtn from '@/components/custom/header/HeaderBtn';

import { useColor } from '@/hooks/use-color';
import { useRouter } from 'expo-router';

type HeaderProps = {
  leftIconName?: string;
  leftIconLabel?: string;
  leftIconPress?: () => void;
  rightIconName?: string;
  rightIconLabel?: string;
  rightIconPress?: () => void;
  title: string;
};

export default function Header({ leftIconName, leftIconLabel, leftIconPress, rightIconName, rightIconLabel, rightIconPress, title }: HeaderProps) {

  const color = useColor();
  const router = useRouter();

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        backgroundColor: '#16191d',
      }}
    >
      <HeaderBtn
        iconName={leftIconName || 'arrow-back'}
        action={leftIconPress || router.back}
        text={leftIconLabel || ''}
      />
      <View style={{ flex: 1 }}>
        <MyText style={{ color: color.textLighter, fontSize: 20, fontWeight: 'bold' }}>
          {title}
        </MyText>
      </View>
      {rightIconName && (
        <HeaderBtn
          iconName={rightIconName}
          action={rightIconPress || (() => {})}
          text={rightIconLabel || ''}
        />
      )}
    </View>
  );
}