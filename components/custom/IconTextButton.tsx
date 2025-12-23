import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

type IconTextButtonProps = {
  text: string;
  iconName: string;
  onPress: () => void;
};

export default function IconTextButton({
  text,
  iconName,
  onPress,
}: IconTextButtonProps) {

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={styles.button}
      >
        <Ionicons name={iconName as any} size={32} color="white" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#841584',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18
  },
});
