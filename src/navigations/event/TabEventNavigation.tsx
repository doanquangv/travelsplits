import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExpenseScreen from '../../screens/events/EventDetail/ExpenseScreen'
import { AddNewScreen } from '../../screens'
import ItineraryScreen from '../../screens/events/EventDetail/ItineraryScreen'
import MemberScreen from '../../screens/events/EventDetail/MemberScreen'

const TabEventNavigation = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator>
        <Tab.Screen name="ExpenseScreen" component={ExpenseScreen} />
        <Tab.Screen name="FeedScreen" component={AddNewScreen} />
        <Tab.Screen name="ItineraryScreen" component={ItineraryScreen} />
        <Tab.Screen name="MemberScreen" component={MemberScreen} />
    </Tab.Navigator>
  )
}

export default TabEventNavigation