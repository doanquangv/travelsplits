// ExpensesNavigator.tsx

import React, { useEffect, useState, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import expenseAPI from "../../../../apis/expenseApi";
import memberAPI from "../../../../apis/memberApi";
import DebtTab from "./DebtTab";
import TransactionsTab from "./TransactionsTab";
import { fontFamily } from "../../../../constants/fontFamilies";
import { app } from "../../../../../configs/firebaseConfig";
import { appColors } from "../../../../constants/appColors";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

interface ExpensesNavigatorProps {
  eventId: string;
  
}

const ExpensesNavigator: React.FC<ExpensesNavigatorProps> = ({ eventId }) => {
  const [totalBudget, setTotalBudget] = useState<any>(null);
  const [actualExpenses, setActualExpenses] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await expenseAPI.HandleExpense(`/${eventId}`);
      if (res && res.data) {
        const { totalBudget, actualExpenses } = res.data;
        setTotalBudget(totalBudget || { amount: 0, title: "", addedBy: "" });
        setActualExpenses(Array.isArray(actualExpenses) ? actualExpenses : []);
      } else {
        setTotalBudget({ amount: 0, title: "", addedBy: "" });
        setActualExpenses([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải chi phí:", error);
      setTotalBudget({ amount: 0, title: "", addedBy: "" });
      setActualExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await memberAPI.getEventMembers(eventId);
      if (res && Array.isArray(res)) {
        setMembers(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setMembers(res.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải thành viên:", error);
      setMembers([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
      fetchMembers();
    }, [eventId])
  );

  const handleRefresh = () => {
    fetchExpenses();
    fetchMembers();
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressOpacity: 0.7, 
        tabBarActiveTintColor: appColors.black,
        tabBarIndicatorStyle: {
          backgroundColor: appColors.black,
          height: 3, 
          borderRadius: 2, 
          width: "20%", 
          marginLeft: "15%", 
        },

        tabBarStyle: {
          marginTop: 10,
          backgroundColor: appColors.white2,
          elevation: 0, 
          height: 50, 
          borderRadius: 25, 
          marginHorizontal: 15,
        },
      }}
    >
      <Tab.Screen name="Dư nợ">
        {(props) => (
          <DebtTab
            {...props}
            eventId={eventId}
            members={members}
            totalBudget={totalBudget}
            actualExpenses={actualExpenses}
            onRefresh={handleRefresh}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Giao dịch">
        {(props) => (
          <TransactionsTab
            {...props}
            totalBudget={totalBudget}
            actualExpenses={actualExpenses}
            eventId={eventId} // Truyền eventId xuống
            onRefresh={handleRefresh}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ExpensesNavigator;
