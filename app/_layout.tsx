import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

import { SnackbarProvider } from '@/components/SnackbarProvider';
import { AlertProvider } from '@/components/providers/AlertProvider'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Jost: require('../assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SnackbarProvider>
      <AlertProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </AlertProvider>
    </SnackbarProvider>
  );
}
