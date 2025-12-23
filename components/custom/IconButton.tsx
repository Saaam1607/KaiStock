import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

type IconButtonProps = {
  iconName: string;
  onPress: () => void;
};

export default function IconButton({
  iconName,
  onPress,
}: IconButtonProps) {

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={styles.button}
      >
        <Ionicons name={iconName as any} size={32} color="white" />
      </View>
    </TouchableHighlight>
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
