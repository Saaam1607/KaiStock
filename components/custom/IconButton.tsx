import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, Pressable, View } from 'react-native';

type IconButtonProps = {
  iconName: string;
  size?: number;
  onPress: () => void;
};

export default function IconButton({
  iconName,
  size = 32,
  onPress,
}: IconButtonProps) {

  return (
    <Pressable onPress={onPress} >
      <View
        style={styles.button}
      >
        <Ionicons name={iconName as any} size={size} color="black" />
      </View>
    </Pressable>
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
