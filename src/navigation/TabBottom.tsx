import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/user';
import Discovery from '../screens/discovery';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsEvent from '../screens/DetailsEvent';
import Notifications from '../screens/notifications';
import User from '../screens/user';

const TabBottom = () => {


  
  // Strack

  const HomeStack = createNativeStackNavigator();

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="DetailsEvent" component={DetailsEvent} />
      </HomeStack.Navigator>
    );
  }
  
  
  // Tab Bottom
  const Tab = createBottomTabNavigator();
  

  const TabGroup = () => {
    return (
      <Tab.Navigator
      
        screenOptions={ ({route,navigation}) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent: React.ComponentType<any> = Ionicons; // Mặc định sử dụng Ionicons
          
            if (route.name === 'HomeStackScreen') {
              iconName = 'home';
            } else if (route.name === 'Khám phá') {
              IconComponent = Feather;
              iconName = 'map-pin';
            } else if (route.name === 'Thêm sự kiện') {
              IconComponent = Feather; // Sử dụng Feather cho icon "Thêm sự kiện"
              iconName = 'plus-circle'; 
            } else if (route.name === 'Thông báo') {
              iconName = 'notifications-outline';
            } else if (route.name === 'Hồ sơ') {
              IconComponent = AntDesign; // Sử dụng AntDesign cho icon "Hồ sơ"
              iconName = 'user';
            }
          
            // Render icon từ component tương ứng
            return <IconComponent name={iconName } size={size} color={color} />; 
          },
          tabBarActiveTintColor: '#673ab7',
          tabBarInactiveTintColor: '#696969',
        })}
      >
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{tabBarLabel:"Trang chủ"}}/>
        <Tab.Screen name="Khám phá" component={Discovery} />
        <Tab.Screen name="Thêm sự kiện" component={DetailsEvent}/>
        <Tab.Screen name="Thông báo" component={Notifications}/>
        <Tab.Screen name="Hồ sơ" component={User}/>
      </Tab.Navigator>
    );
  }


    return (
    <NavigationContainer>
      <TabGroup/>
    </NavigationContainer>
    )
}

export default TabBottom