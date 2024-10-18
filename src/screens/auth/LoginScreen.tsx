import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
  return (
    
      <View style={[globalStyles.container,{padding: 30, }]}>
      <Text>LoginScreen</Text>
      {/* <Button  title="Login" onPress={async() => await AsyncStorage.setItem('assetToken','asdasd')} /> */}

      <ButtonComponent text='forget password' onPress={()=> console.log('login')}
      type='link'
      icon={<Text>icon</Text>}
      />
    </View>
    
    
  )
}

export default LoginScreen