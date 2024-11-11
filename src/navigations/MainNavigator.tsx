import { View, Text } from "react-native";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBottom from "./TabNavigation";
import { EventDetail, HomeScreen } from "../screens";
import TabNavigation from "./TabNavigation";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="main" component={TabNavigation} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
        </Stack.Navigator>
      
  );
};

export default MainNavigator;
