import { useColor } from '@/hooks/use-color';
import { StyleSheet, View } from 'react-native';
import MyText from './generic/MyText';

type QuantityFieldProps = {
  label: string;
  quantity: number;
  colored?: boolean;
};

export function QuantityField({
  label,
  quantity,
  colored = false,
}: QuantityFieldProps) {

  const color = useColor();

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        gap: 20,
      }}
    >
      <MyText
        style={{
          width: 125,
          color: color.textLighter,
        }}
      >
        {label}
      </MyText>
      <MyText
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: colored ? ( quantity > 0 ? color.green : color.red ) : color.text,
          borderRadius: 10,
          width: 75,
        }}
      >
        {quantity}
      </MyText>
    </View>
  );
}