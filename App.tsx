import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

// SplashScreen.preventAutoHideAsync();
const App= () => {
  // const [loaded, error] = useFonts({
  //   [NOTO_SANS]: require('./assets/fonts/NotoSans-VariableFont_wdth,wght.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    },1500)
    return () => clearTimeout(timeout);
  },[]);



  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor='trasnparent' translucent/>
      {isShowSplash? (

      <SplashScreen/>) : (
      <NavigationContainer>
    
        <AuthNavigator/>
    
      </NavigationContainer>
    
      )}
    </>
  )
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


