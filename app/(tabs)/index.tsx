import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

import { useRouter } from 'expo-router';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <GestureContainer
      // rightAction={() => router.push('/(tabs)/warehouse')}
    >

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/topWallpaper.jpg')}
            style={styles.wallpaper}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">KaiStock</ThemedText>
        </ThemedView>
        
      </ParallaxScrollView>
    </GestureContainer>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  wallpaper: {
    height: 300,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
