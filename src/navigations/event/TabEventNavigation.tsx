// client/travelsplits/src/screens/events/EventDetailTabs.tsx

import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { appColors } from "../../constants/appColors";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon từ react-native-vector-icons

import MembersTab from "../../screens/events/EventDetail/MembersTab";
import { Text, View } from "react-native";
import { fontFamily } from "../../constants/fontFamilies";
import ScheduleNavigator from "./ScheduleNavigator";
import ExpensesTab from "../../screens/events/EventDetail/expenseScreen/DebtTab";
import ExpensesNavigator from "../../screens/events/EventDetail/expenseScreen/ExpensesNavigator";
import memberAPI from "../../apis/memberApi";

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

  const [isHost, setIsHost] = useState(false);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await memberAPI.getEventMembers(eventId);
        const currentUserId = "current_user_id"; 
        const isHostRole = res?.data?.some(
          (member: any) => member.userId._id === currentUserId && member.role === "host"
        );
        setIsHost(isHostRole ?? false);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setIsHost(false);
      }
    };

    fetchUserRole();
  }, [eventId]);

  if (isHost === null) {
    return <Text>Loading...</Text>;
  }

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

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
        children={(props) => <ExpensesNavigator  {...props} eventId={eventId} />}
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
        children={(props) => <ScheduleNavigator {...props} eventId={eventId}  onRefresh={handleRefresh} />}        
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
          children={(props) => <MembersTab {...props} eventId={eventId} onRefresh={handleRefresh} />}
        
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
