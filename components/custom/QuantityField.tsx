import { StyleSheet, Text, View } from 'react-native';

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

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        gap: 20,
      }}
    >
      <Text
        style={{
          width: 125,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: colored && ( quantity > 0 ? 'green' : 'red' ),
          borderRadius: 10,
          width: 75,
        }}
      >
        {quantity}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18
  },
});
