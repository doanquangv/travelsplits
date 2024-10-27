import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import React from 'react'
import { StyleSheet } from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView  style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default MapScreen