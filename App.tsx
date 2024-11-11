import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppRouters from './src/navigations/AppRouters';
import store from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({    
    'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-Light': require('./assets/fonts/NotoSans-Light.ttf'),
    'NotoSans-Medium': require('./assets/fonts/NotoSans-Medium.ttf'),
    'NotoSans-SemiBold': require('./assets/fonts/NotoSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) { // Chỉ ẩn khi font được tải thành công
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    if (error) {
      console.error('Lỗi khi tải font:', error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
    }
    return null;
  }
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent />

        <Host>
          <NavigationContainer>
             <AppRouters /> 
          </NavigationContainer>
        </Host>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;