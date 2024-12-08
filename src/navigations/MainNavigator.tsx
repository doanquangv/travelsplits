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

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  // const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={TabNavigation} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen
        name="AddNewSchedule"
        component={AddScheduleScreen}
        options={{ title: "Thêm Lịch Trình" }}
      />
      <Stack.Screen
        name="EditScheduleScreen"
        component={EditScheduleScreen}
        options={{ title: "Chỉnh Sửa Lịch Trình" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
