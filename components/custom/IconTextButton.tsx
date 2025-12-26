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
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{
        width: '45%',
      }}
    >
      <View
        style={styles.button}
      >
        <Ionicons name={iconName as any} size={60} color="white" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    // flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#841584',
    // gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  text: {
    color: 'white',
    fontSize: 18
  },
});
