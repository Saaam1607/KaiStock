import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function WarehouseLayout() {
  
  const router = useRouter();
  
  return (
    <Stack
        screenOptions={({ route }) => {
        const direction = (route.params as { direction?: string })?.direction;

        return {
          animation: direction === 'forward' ? 'slide_from_right' : 'slide_from_left',
          headerShown: true,
        };
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="products" />
      <Stack.Screen
        name="productions"
        
        options={{
          title: 'Produzioni',
          headerShown: true,
          headerLeft: () => (
            <Button
              title="←"
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/warehouse',
                  params: { direction: 'back' },
                })
              }
              />
            ),
        }}
      />
    </Stack>
  );
}
