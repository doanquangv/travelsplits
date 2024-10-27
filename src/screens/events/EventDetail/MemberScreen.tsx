import { View, Text } from 'react-native'
import React from 'react'
import { eventModel } from '../../../models/eventModel';

const MemberScreen =  ({ navigation, route }: any) => {
    const {item}: {item: eventModel} = route.params;
  return (
    <View>
      <Text>MemberScreen</Text>
    </View>
  )
}

export default MemberScreen