import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper' // or the correct path to Swiper
import { AppInfo } from '../../constants/AppInfor'
import { appColors } from '../../constants/appColors'

const OnbroadingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0)
  return (
    <View style = {[globalStyles.container]}>
      <Swiper style={{}}  loop={false} onIndexChanged={num => setIndex(num)} activeDotColor={appColors.white} index={index} >
        <Image source={require('../../assets/images/onboarding-4.png')} style={{flex:1, width: AppInfo.sizes.WIDTH, height: AppInfo.sizes.HEIGHT, }}/>

        <Image source={require('../../assets/images/onboarding-5.png')} style={{flex:1, width: AppInfo.sizes.WIDTH, height: AppInfo.sizes.HEIGHT,}}/>

        <Image source={require('../../assets/images/onboarding-6.png')} style={{flex:1, width: AppInfo.sizes.WIDTH, height: AppInfo.sizes.HEIGHT, }}/>
      </Swiper>
      <View style= {[{paddingHorizontal:40, paddingVertical:60, position:'absolute', bottom:0, right:0, left:0, flexDirection: 'row', justifyContent:"space-between", alignItems:'center',}]}>
        <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
          <Text style = {{color: "#B8B6BE", fontSize: 20, fontWeight:500}}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')}>
          <Text style = {{color: "white", fontSize: 20, fontWeight:500}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OnbroadingScreen