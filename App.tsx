import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AuthNavigator from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigations/MainNavigator';
import SplashScreens from './src/screens/SplashScreens';
import { useFonts } from 'expo-font';
import { fontFamily } from './src/constants/fontFamilies';
export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({   
    regular: require('./assets/fonts/NotoSans-Regular.ttf'),
    bold: require('./assets/fonts/NotoSans-Bold.ttf'),
    // italic: require('./assets/fonts/NotoSans-Italic.ttf'),
    light: require('./assets/fonts/NotoSans-Light.ttf'),
    medium: require('./assets/fonts/NotoSans-Medium.ttf'),
    semibold: require('./assets/fonts/NotoSans-SemiBold.ttf'),
  });

  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  // Kiểm tra token trong AsyncStorage
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('assetToken');
      if (token) {
        setAccessToken(token);
      }
      setIsShowSplash(false);
      SplashScreen.hideAsync();
    };

    // Chờ 2 giây và sau đó kiểm tra token
    if (fontsLoaded) {
      setTimeout(() => {
        checkLogin();
      }, 2000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent />
      {isShowSplash ? (
        <SplashScreens />
      ) : (
        <NavigationContainer>
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
