import React from 'react';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';

export default () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigation />
      </NavigationContainer>
    </AppearanceProvider>
  );
};
