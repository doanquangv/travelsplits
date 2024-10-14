import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigations/MainNavigator';
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
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState("")

  const {getItem, setItem} = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    },2000)
    return () => clearTimeout(timeout);
  },[]);

  useEffect(() => {
    checkLogin();
  },[])
  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  };


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor='trasnparent' translucent/>
      {isShowSplash? (

      <SplashScreen/>) : (
      <NavigationContainer>
        {accessToken ? <MainNavigator/> : <AuthNavigator/>}

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



