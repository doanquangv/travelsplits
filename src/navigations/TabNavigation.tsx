import { View, Text } from "react-native";
import React, { ReactNode } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AddNewScreen,
  HomeScreen,
  MapScreen,
  NotificationScreen,
  ProfileScreen,
} from "../screens";
import HomeNavigator from "./HomeNavigator";
import MapNavigator from "./MapNavigator";
import NotificationNavigator from "./NotificationNavigator";
import { appColors } from "../constants/appColors";
import { AddSquare, Home2 } from "iconsax-react-native";
import TextComponent from "../components/TextComponent";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { globalStyles } from "../styles/globalStyles";
import { Circle } from "react-native-svg";
import { CircleComponent } from "../components";

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
                <CircleComponent size={50} styles={{marginTop: -45}}>
                  <AddSquare size={25} color={appColors.white} variant="Bold" />
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
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Notification" component={NotificationNavigator} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

// function CreateBottomTabNavigator() {
//   throw new Error('Function not implemented.');
// }

// import { View, Text } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/home/HomeScreen';
// import SettingsScreen from '../screens/user';
// import Discovery from '../screens/discovery';
// import Feather from '@expo/vector-icons/Feather';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DetailsEvent from '../screens/DetailsEvent';
// import Notifications from '../screens/notifications';
// import User from '../screens/user';

// const TabBottom = () => {

//   // Strack

//   const HomeStack = createNativeStackNavigator();

//   const HomeStackScreen = () => {
//     return (
//       <HomeStack.Navigator>
//         <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
//         <HomeStack.Screen name="DetailsEvent" component={DetailsEvent} />
//       </HomeStack.Navigator>
//     );
//   }

//   // Tab Bottom
//   const Tab = createBottomTabNavigator();

//   const TabGroup = () => {
//     return (
//       <Tab.Navigator

//         screenOptions={ ({route,navigation}) => ({
//           headerShown: false,
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let IconComponent: React.ComponentType<any> = Ionicons; // Mặc định sử dụng Ionicons

//             if (route.name === 'HomeStackScreen') {
//               iconName = 'home';
//             } else if (route.name === 'Khám phá') {
//               IconComponent = Feather;
//               iconName = 'map-pin';
//             } else if (route.name === 'Thêm sự kiện') {
//               IconComponent = Feather; // Sử dụng Feather cho icon "Thêm sự kiện"
//               iconName = 'plus-circle';
//             } else if (route.name === 'Thông báo') {
//               iconName = 'notifications-outline';
//             } else if (route.name === 'Hồ sơ') {
//               IconComponent = AntDesign; // Sử dụng AntDesign cho icon "Hồ sơ"
//               iconName = 'user';
//             }

//             // Render icon từ component tương ứng
//             return <IconComponent name={iconName } size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#673ab7',
//           tabBarInactiveTintColor: '#696969',
//         })}
//       >
//         <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{tabBarLabel:"Trang chủ"}}/>
//         <Tab.Screen name="Khám phá" component={Discovery} />
//         <Tab.Screen name="Thêm sự kiện" component={DetailsEvent}/>
//         <Tab.Screen name="Thông báo" component={Notifications}/>
//         <Tab.Screen name="Hồ sơ" component={User}/>
//       </Tab.Navigator>
//     );
//   }

//     return (
//     <NavigationContainer>
//       <TabGroup/>
//     </NavigationContainer>
//     )
// }

// export default TabBottom
