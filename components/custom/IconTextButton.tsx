import { StyleSheet, Pressable, View, ImageBackground, ImageSourcePropType } from 'react-native';
import MyText from './generic/MyText';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColor } from '@/hooks/use-color';
import { memo } from 'react';

type IconTextButtonProps = {
  text: string;
  iconName: string;
  onPress: () => void;
  backgroundImage: ImageSourcePropType;
};

function IconTextButton({
  text,
  iconName,
  onPress,
  backgroundImage,
}: IconTextButtonProps) {
  
  const color = useColor();

  return (
    <Pressable
      onPress={onPress}
      style={styles.touchable}
    >
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          {/* Gradient overlay fading from left (dark) to right (transparent) */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.95)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.4)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View style={styles.content}>
              {/* Icon positioned on the left */}
              <View style={styles.iconContainer}>
                <Ionicons name={iconName as any} size={48} color="white" />
              </View>
              
              {/* Text below the icon */}
              <MyText style={styles.text}>{text}</MyText>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

export default memo(IconTextButton);

const styles = StyleSheet.create({
  touchable: {
    width: 300,
    height: 250,
    borderRadius: 25,
    overflow: 'hidden',
  },
  container: {
    // borderRadius: 16,
    // overflow: 'hidden',
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  content: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginBottom: 0,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});