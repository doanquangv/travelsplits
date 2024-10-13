import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/home';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { NOTO_SANS } from './utils/const';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/navigation/TabBottom';
import TabBottom from './src/navigation/TabBottom';

SplashScreen.preventAutoHideAsync();
const App= () => {
  const [loaded, error] = useFonts({
    [NOTO_SANS]: require('./assets/fonts/NotoSans-VariableFont_wdth,wght.ttf'),
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
    
      <SafeAreaView style={{flex: 1}}>
          {/* <HomeScreen/> */}
          <TabBottom/>
      </SafeAreaView>
    
  );
}


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


