import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ForgotPassword, LoginScreen, SignUpScreen, Verification } from '../screens';
import OnbroadingScreen from '../screens/auth/OnbroadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthNavigator = () => {
  
  const Stack = createNativeStackNavigator();
    
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

    
    </Stack.Navigator>
  )
}

export default AuthNavigator