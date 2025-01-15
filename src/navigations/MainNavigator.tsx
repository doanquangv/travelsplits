import { View, Text } from "react-native";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBottom from "./TabNavigation";
import { EventDetail, HomeScreen } from "../screens";
import TabNavigation from "./TabNavigation";
import AddScheduleScreen from "../screens/events/EventDetail/ScheduleScreen/AddNewScheduleScreen";
import { RootStackParamList } from "./types";
import EditScheduleScreen from "../screens/events/EventDetail/ScheduleScreen/EditScheduleScreen";
import ExpenseDetailScreen from "../screens/events/EventDetail/expenseScreen/ExpenseDetailScreen";
import EditExpenseScreen from "../screens/events/EventDetail/expenseScreen/EditExpenseScreen";
import EditEventScreen from "../screens/events/EventDetail/EditEventScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  // const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={TabNavigation} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen
        name="AddScheduleScreen"
        component={AddScheduleScreen}
      />
      <Stack.Screen
        name="EditScheduleScreen"
        component={EditScheduleScreen}
      />
      <Stack.Screen name="ExpenseDetailScreen" component={ExpenseDetailScreen} />
        
      <Stack.Screen name="EditExpenseScreen" component={EditExpenseScreen} />
      <Stack.Screen name ='EditEventScreen' component={EditEventScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
