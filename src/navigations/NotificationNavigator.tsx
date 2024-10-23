import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationScreen } from '../screens';

const NotificationNavigator = () => {
    const Stack = createNativeStackNavigator();  
    return (
      <Stack.Navigator 
          screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      </Stack.Navigator>
    )
}

export default NotificationNavigator