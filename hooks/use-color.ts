import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useColor() {
  const scheme = useColorScheme() ?? 'light';

  const theme = Colors[scheme];

  return {
    ...theme,
    getColor: (colorName: keyof typeof Colors.light & keyof typeof Colors.dark) =>
      theme[colorName],
    scheme,
  };
}
