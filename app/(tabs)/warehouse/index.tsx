import { useRouter } from 'expo-router';

import { ScrollView, StyleSheet, View } from 'react-native';

import { PageContainer } from '@/components/custom/containers/PageContainer';

import IconButton from '@/components/custom/IconTextButton';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function HomeScreen({ navigation }: any) {
  
  const router = useRouter();

  return (
    <GestureContainer
      // upAction={() => router.push('/(tabs)/index')}
      // downAction={() => router.push('/(tabs)/index')}
      // leftAction={() => router.push('/(tabs)/index')}
      // leftAction={() => router.push('/(tabs)/')}
    >
      <PageContainer>

        <ScrollView
          style={{
          }}
          contentContainerStyle={{
            gap: 20,
            padding: 20
          }}
        >
          <View style={styles.buttonContainer}>
            <IconButton
              text={"Articoli"}
              iconName={"book"}
              onPress={() => navigation.navigate('products')}
            />
            <IconButton
              text={"Produzione"}
              iconName={"construct-sharp"}
              onPress={() => router.push(
                {
                  pathname: '/(tabs)/warehouse/productions',
                  params: { direction: 'forward' },
                }
              )}
            />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              text={"Riserva"}
              iconName={"bag-sharp"}
              onPress={() => navigation.navigate('reservations')}
            />
            <IconButton
              text={"Vendi"}
              iconName={"bag-check-sharp"}
              onPress={() => router.push('/(tabs)/warehouse/orders')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              text={"Inventario"}
              iconName={"clipboard"}
              onPress={() => router.push('/(tabs)/warehouse/inventory')}
            />
            <IconButton
              text={"Storico Inventario"}
              iconName={"time"}
              onPress={() => router.push('/(tabs)/warehouse/inventory')}
            />
          </View>
        </ScrollView>
      </PageContainer>
    </GestureContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
});
