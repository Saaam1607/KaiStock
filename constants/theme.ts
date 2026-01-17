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
    peach: '#f3b28fff',
    red: '#FF0000',
    green: '#427842',
    purple: '#FF00FF',
    cardBackground: '#e0e0e0ff',
    cardTable: '#afafafff',
    cardTableBorder: '#2f2f2fff',
    cardImage: '#a2a2a2ff',
    cardImageBackground: '#e0e0e0ff',
    searchBackground: '#e0e0e0ff',
    modalBackground: '#e0e0e0ff',
    inputBorderColor: '#2f2f2fff',
    inputChangedBorderColor: '#beba96ff',
    cardItem: '#e0e0e0ff',
    cardItemDark: '#2f2f2fff',
    graphs: {
      red: '#ff6666ff',
      green: '#66ff66ff',
    },
    edit: {
      green: 'rgb(64, 167, 64)',
      orange: 'rgb(221, 165, 54)',
      red: 'rgb(160, 58, 58)',
    }
  },
  dark: {
    // backGroundGradient: ['#222222', '#1E1E1E', '#181818'],
    backGroundGradient: ['#323e3e', '#233032', '#16191d'],
    menuButtonGradient: ['#366962ff', '#4c909bff'],
    text: '#e0e0e0ff',
    textLighter: '#afafafff',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    orange: '#dda536ff',
    peach: 'rgba(240, 191, 138, 0.2)',
    red: '#a63232ff',
    green: 'rgba(98, 194, 98, 0.2)',
    purple: '#a159aeff',
    cardBackground: 'rgba(0, 0, 0, 0.3)',
    cardTable: '#606060ff',
    cardTableBorder: '#a2a2a2ff',
    cardImage: '#676767ff',
    cardImageBackground: '#2f2f2fff',
    searchBackground: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#2b2b2bff',
    inputBorderColor: '#585858ff',
    inputChangedBorderColor: '#8a7b69ff',
    cardItem: '#313131ff',
    cardItemDark: '#242424ff',
    graphs: {
      red: 'rgb(160, 58, 58)',
      green: 'rgb(64, 167, 64)',
    },
    edit: {
      green: 'rgb(0, 0, 0)',
      orange: 'rgb(147, 127, 88)',
      red: 'rgb(114, 44, 44)',
    }
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
