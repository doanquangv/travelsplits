import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleTab from '../../screens/events/EventDetail/ScheduleTab';
import AddNewScheduleScreen from '../../screens/events/EventDetail/AddNewSchedule';
import { RootStackParamList } from '../types';


const Stack = createNativeStackNavigator<RootStackParamList>();
const ScheduleNavigator = ({ eventId }: { eventId: string }) => {
    return (
      <Stack.Navigator  initialRouteName="ScheduleTab"
          screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="ScheduleTab"
          
          children={(props) => <ScheduleTab {...props} eventId={eventId} />}                                                              />
          
          {/* <Stack.Screen name="EventDetail" component={EventDetail} /> */}
      </Stack.Navigator>
    )
}

export default ScheduleNavigator