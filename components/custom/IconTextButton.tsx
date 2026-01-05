import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

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

  const gradientColors: [string, string, ...string[]] = color.menuButtonGradient.length >= 2
    ? (color.menuButtonGradient as [string, string, ...string[]])
    : ['#fff', '#000'];

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{
        width: '45%',
      }}
    >
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.button,
        ]}>
          <Ionicons name={iconName as any} size={60} color="white" />
          <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
}

export default memo(IconTextButton);

const styles = StyleSheet.create({
  button: {
    // flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#699c9fff',
    // gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '100%',
    height: 150,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
