/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { SearchBar } from '@/components/custom/SearchBar';
import { Platform } from 'react-native';

import { Appearance } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const colorScheme = Appearance.getColorScheme();

export const Colors = {
  light: {
    backGroundGradient: ['#222222', '#1E1E1E', '#181818'],
    menuButtonGradient: ['#366962ff', '#4d8c96ff'],
    text: '#11181C',
    textLighter: '#505050ff',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    orange: '#dda536ff',
    red: '#FF0000',
    green: '#00FF00',
    purple: '#FF00FF',
    cardImage: '#a2a2a2ff',
    cardImageBackground: '#e0e0e0ff',
    searchBackground: '#e0e0e0ff',
    modalBackground: '#e0e0e0ff',
    inputBorderColor: '#2f2f2fff',
    inputChangedBorderColor: '#beba96ff',
  },
  dark: {
    backGroundGradient: ['#222222', '#1E1E1E', '#181818'],
    menuButtonGradient: ['#366962ff', '#4c909bff'],
    text: '#e0e0e0ff',
    textLighter: '#afafafff',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    orange: '#dda536ff',
    red: '#a63232ff',
    green: '#30b474ff',
    purple: '#a159aeff',
    cardImage: '#676767ff',
    cardImageBackground: '#2f2f2fff',
    searchBackground: '#2f2f2fff',
    modalBackground: '#2b2b2bff',
    inputBorderColor: '#585858ff',
    inputChangedBorderColor: '#8a7b69ff',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
