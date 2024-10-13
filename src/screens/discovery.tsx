import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Header from '../components/features/Header'
const Discovery = () => {
  return (
    <View style={styles.container}>
      <Header />
      
      <MapView style={styles.map}  
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        
        mapType='mutedStandard'
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Discovery;