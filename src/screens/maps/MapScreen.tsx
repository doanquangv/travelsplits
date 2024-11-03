import { View, Text, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import React from 'react'
import { StyleSheet } from 'react-native';
import ContainerComponent from '../../components/ContainerComponent';

const MapScreen = () => {
  return (
    <ContainerComponent >
      <View style={styles.container}>
        <MapView  style={styles.map}  showsUserLocation={true} >

        </MapView>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
   overflow: 'hidden',
   marginTop: 20,
   borderRadius: 20,
   justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('screen').width*0.89,
    height: Dimensions.get('screen').height*0.25,
    
    
  },
});
export default MapScreen
