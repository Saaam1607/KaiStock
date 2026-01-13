import { Stack } from 'expo-router';

import { SnackbarProvider } from '@/components/SnackbarProvider';
import { AlertProvider } from '@/components/providers/AlertProvider'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {

  const colorScheme = useColorScheme();

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
