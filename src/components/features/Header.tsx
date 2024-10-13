import { View, Text,Image, StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = () => {
  return (
    <SafeAreaView>
      <View style ={{flexDirection: "row", alignItems:"center"}}>
        <Image source={require('../../../assets/image/png-transparent-google-maps-hd-logo-thumbnail.png')} 
          style={styles.logo}
        />

      <View>
        <TextInput placeholder='Tìm địa điểm mong muốn' style={styles.search}/>
      </View>
    </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  logo: {
    width:28,
    height:40,
  },
  search: {
    // height: 40,
    borderColor: '#B198BD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    paddingLeft: 20,
    marginLeft: 8,
    width: Dimensions.get('screen').width*0.85,

  }
})

export default Header