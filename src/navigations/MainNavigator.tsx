import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBottom from './TabNavigation';
import { HomeScreen } from '../screens';
import TabNavigation from './TabNavigation';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="main" component={TabNavigation} />
    </Stack.Navigator>
  )
}

export default MainNavigator