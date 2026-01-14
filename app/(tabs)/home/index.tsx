import { Image } from 'expo-image';
import { StyleSheet, View , Text} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { useRouter } from 'expo-router';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

import SummaryCard from '@/components/custom/home/SummaryCard';
import UnpaidSales from '@/components/custom/home/UnpaidSales';

import { useColor } from '@/hooks/use-color';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

  const router = useRouter();

  const color = useColor();

  const today = new Date(); 

  return (
    <PageContainer>
      <BodyContainer>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: color.text,
            }}
          >
            {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
          </Text>
          <View>
            <Ionicons name="person-circle" size={75} color={color.text} />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <ThemedText type="title">KaiStock</ThemedText>
          
          <SummaryCard />
          
          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>

            {/* Da Consegnare */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: 'rgb(78, 96, 100)',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: 'rgb(200, 225, 230)',
                }}
              >
                Da consegnare
              </Text>
            </View>

            {/* Da Incassare */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderRadius: 999,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                borderColor: 'rgb(78, 96, 100)',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: 'rgb(200, 235, 210)',
                }}
              >
                Da incassare
              </Text>
            </View>

          </View>


          <UnpaidSales />
        </View>
      </BodyContainer>
      {/* <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/topWallpaper.jpg')}
            style={styles.wallpaper}
          />
        }> */}

      {/* </ParallaxScrollView> */}
    </PageContainer> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
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
