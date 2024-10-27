import { View, Text } from 'react-native'
import React from 'react'
import { eventModel } from '../../../models/eventModel';

const FeedScreen = ({ navigation, route }: any) => {
    const {item}: {item: eventModel} = route.params;
  return (
    <View>
      <Text>FeedScreen</Text>
    </View>
  )
}

export default FeedScreen