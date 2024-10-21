import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreens from './src/screens/SplashScreens';
import { useFonts } from 'expo-font';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import AppRouters from './src/navigations/AppRouters';

const App = () => {
  const [loaded, error] = useFonts({    
    regular: require('./assets/fonts/NotoSans-Regular.ttf'),
    bold: require('./assets/fonts/NotoSans-Bold.ttf'),
    light: require('./assets/fonts/NotoSans-Light.ttf'),
    medium: require('./assets/fonts/NotoSans-Medium.ttf'),
    semibold: require('./assets/fonts/NotoSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent />

        <NavigationContainer>
          <AppRouters /> 
        </NavigationContainer>

      </Provider>
    </>
  );
}

export default App;