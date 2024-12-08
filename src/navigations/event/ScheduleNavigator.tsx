import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleTab from "../../screens/events/EventDetail/ScheduleTab";
// import AddNewScheduleScreen from "../../screens/events/EventDetail/ScheduleScreen/AddNewScheduleScreen";
import { RootStackParamList } from "../types";
import ScheduleDetailScreen from "../../screens/events/EventDetail/ScheduleScreen/ScheduleDetailScreen";
// import EditScheduleModal from "../../modals/eventModals/EditScheduleModal";
import AddScheduleScreen from "../../screens/events/EventDetail/ScheduleScreen/AddNewScheduleScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const ScheduleNavigator = ({ eventId }: { eventId: string }) => {
  return (
    <Stack.Navigator
      initialRouteName="ScheduleTab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ScheduleTab"
        children={(props) => <ScheduleTab {...props} eventId={eventId} />}
      />

      <Stack.Screen
        name="ScheduleDetailScreen"
        component={ScheduleDetailScreen}
        options={{ title: "Chi Tiết Lịch Trình" }}
      />

      
    </Stack.Navigator>
  );
};

export default ScheduleNavigator;
