import { ThemeProvider, createTheme } from '@rneui/themed';
import React from 'react';
import { Colors as colors } from 'ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

const theme = createTheme({
    lightColors: {
        background: colors.spanish_gray.base,
        primary: colors.smoky_black.base,
        secondary: '#fff',
        white: colors.spanish_white.base,
        black: colors.smoky_black.base,
        grey0: colors.silver_sand.light,
        grey1: colors.silver_sand.base,
        grey2: colors.silver_sand.muted,
        grey3: colors.spanish_gray.muted,
        grey4: colors.spanish_gray.base,
        grey5: colors.spanish_gray.shadow,
        greyOutline: colors.silver_sand.muted,
        searchBg: colors.spanish_gray.light,
        success: colors.medium_aquamarine.base,
        warning: colors.lemon.base,
        error: colors.electric_orange.base
    }
});


export default function App() {
  return (
      <ThemeProvider theme={theme}>
      <SafeAreaProvider>
       <HomeScreen/>
        </SafeAreaProvider>
    </ThemeProvider>
  );
}


