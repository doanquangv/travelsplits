import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBottom from './TabBottom';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="main" component={TabBottom} />
    </Stack.Navigator>
  )
}

export default MainNavigator