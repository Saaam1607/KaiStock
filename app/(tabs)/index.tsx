import { Image } from 'expo-image';
import { StyleSheet, View , Text} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useRouter } from 'expo-router';

import { GestureContainer } from '@/components/custom/GestureContainer';

import SummaryCard from '@/components/custom/home/SummaryCard';
import UnpaidSales from '@/components/custom/home/UnpaidSales';

import FlipCard from '@/components/custom/home/FlipCard';


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
          <SummaryCard />
          <UnpaidSales />

        </ThemedView>
        
      </ParallaxScrollView>
    </GestureContainer>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
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
