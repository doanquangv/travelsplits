import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppInfo } from '../constants/AppInfor'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
  return (
    <ImageBackground source={require('../assets/images/splash-image.png')} style={{flex:1, justifyContent:'center', alignItems:'center'}} imageStyle={{flex: 1}}>

      <Image source={require('../assets/images/logo.png')} style={{width: AppInfo.sizes.WIDTH * 0.8, resizeMode:"contain"}}/>

      <SpaceComponent  height={25} width={0} />
      <ActivityIndicator color={appColors.gray} size={22}/>
    </ImageBackground>
    
    
  )
}

export default SplashScreen