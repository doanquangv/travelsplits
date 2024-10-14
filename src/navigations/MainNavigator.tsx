import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBottom from './TabBottom';
import { HomeScreen } from '../screens';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="main" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator