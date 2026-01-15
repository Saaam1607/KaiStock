import { StyleSheet, TouchableHighlight, View } from 'react-native';
import MyText from './generic/MyText';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';
import { memo } from 'react';

type IconTextButtonProps = {
  text: string;
  iconName: string;
  onPress: () => void;
};

function IconTextButton({
  text,
  iconName,
  onPress,
}: IconTextButtonProps) {

  const color = useColor();

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{
        width: '45%',
      }}
    >
      <View style={[ styles.button ]}>
        <Ionicons name={iconName as any} size={60} color={color.text} />
        <MyText style={styles.text}>{text}</MyText>
      </View>
    </TouchableHighlight>
  );
}

export default memo(IconTextButton);

const styles = StyleSheet.create({
  button: {
    // flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
    width: '100%',
    height: 150,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
