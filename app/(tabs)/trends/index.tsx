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
              text={"Andamento Guadagno Lordo"}
              iconName={"cash-outline"}
              onPress={() => navigation.navigate('earningsTrend')}
            />
            <IconButton
              text={"Andamento Guadagno Netto"}
              iconName={"cash-outline"}
              onPress={() => navigation.navigate('netEarningsTrend')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              text={"Andamento Spese"}
              iconName={"logo-euro"}
              onPress={() => navigation.navigate('expensesTrend')}
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