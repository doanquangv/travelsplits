// client/travelsplits/src/screens/events/EventDetailTabs.tsx

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { appColors } from "../../constants/appColors";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ react-native-vector-icons

import MembersTab from "../../screens/events/EventDetail/MembersTab";
import { Text, View } from "react-native";
import { fontFamily } from "../../constants/fontFamilies";
import ScheduleNavigator from "./ScheduleNavigator";
import ExpensesTab from "../../screens/events/EventDetail/expenseScreen/ExpensesTab";

// Định nghĩa kiểu cho Tab Navigator
export type EventDetailTabParamList = {
  Expenses: undefined;
  Schedule: undefined;
  Members: undefined;
};

interface TabEventNavigationProps {
  eventId: string;
}

const Tab = createMaterialTopTabNavigator<EventDetailTabParamList>();

const TabEventNavigation: React.FC<TabEventNavigationProps> = ({ eventId }) => {
  return (
    <Tab.Navigator
      initialRouteName="Expenses"
      screenOptions={{
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.text,
        tabBarIndicatorStyle: { backgroundColor: appColors.primary },
        tabBarStyle: {
          backgroundColor: appColors.white2,
          height: 75,
          justifyContent: "center",
        },
        tabBarLabelStyle: { fontFamily: fontFamily.bold },
      }}
    >
      <Tab.Screen
        name="Expenses"
        children={(props) => <ExpensesTab {...props} eventId={eventId} />}
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ alignItems: "center" }}>
              <Icon name="money" size={18} color={color} />
              <Text
                style={{ color, fontFamily: fontFamily.medium, marginTop: 8 }}
              >
                Chi Phí
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        children={(props) => <ScheduleNavigator {...props} eventId={eventId} />}        
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ alignItems: "center" }}>
              <Icon name="calendar" size={18} color={color} style={{}} />
              <Text
                style={{ color, fontFamily: fontFamily.medium, marginTop: 8 }}
              >
                Lịch trình
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
         name="Members"
          children={(props) => <MembersTab {...props} eventId={eventId} />}
        
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ alignItems: "center" }}>
              <Icon name="users" size={18} color={color} style={{}} />
              <Text
                style={{ color, fontFamily: fontFamily.medium, marginTop: 8 }}
              >
                Thành viên
              </Text>
            </View>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default TabEventNavigation;
