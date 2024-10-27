import { View, Text } from 'react-native'
import React from 'react'
import { eventModel } from '../../../models/eventModel';

const ItineraryScreen =  ({ navigation, route }: any) => {
    const {item}: {item: eventModel} = route.params;
  return (
    <View>
      <Text>ItineraryScreen</Text>
    </View>
  )
}

export default ItineraryScreen