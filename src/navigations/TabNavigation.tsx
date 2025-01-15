import React, { ReactNode } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddSquare, Home2 } from "iconsax-react-native";
import { CircleComponent } from "../components";
import TextComponent from "../components/TextComponent";
import { appColors } from "../constants/appColors";
import {
  AddNewScreen,
  HomeScreen,
  ProfileScreen
} from "../screens";
import MapNavigator from "./MapNavigator";
import NotificationNavigator from "./NotificationNavigator";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 88,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appColors.white,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray;
          size = 27;
          switch (route.name) {
            case "Home":
              icon = <Home2 color={color} size={size} />;
              break;

            case "Map":
              icon = <Feather name="map-pin" color={color} size={size} />;
              break;

            case "Notification":
              icon = (
                <Ionicons
                  name="notifications-outline"
                  color={color}
                  size={size}
                />
              );
              break;
            case "User":
              icon = <AntDesign name="user" color={color} size={size} />;
              break;

            case "Add":
              icon = (
                <CircleComponent size={55} styles={{marginTop: -25}}>
                  <AddSquare size={30} color={appColors.white} variant="Bold" />
                </CircleComponent>
                
              );
          }
          return icon;
        },
        tabBarIconStyle: {},
        tabBarLabel({ focused }) {
          return route.name === "Add" ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Notification" component={NotificationNavigator} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

