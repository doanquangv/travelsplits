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

  useEffect(() => {
    fetchExpenses();
    fetchMembers();
  }, [eventId]);

  // Hàm callback để DebtTab gọi khi có thay đổi dữ liệu (thêm chi tiêu, thêm budget)
  const handleDataChange = useCallback(() => {
    // Gọi lại fetchExpenses, fetchMembers để cập nhật dữ liệu
    fetchExpenses();
    fetchMembers();
  }, [eventId]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressOpacity: 0.7, // Độ mờ khi nhấn vào tab
        tabBarActiveTintColor: appColors.black,
        tabBarIndicatorStyle: {
          backgroundColor: appColors.black,
          height: 3, // Độ dày của indicator
          borderRadius: 2, // Làm tròn các góc của indicator
          width: "20%", // Tạo hiệu ứng indicator ngắn hơn tab
          marginLeft: "15%", // Căn chỉnh lại vị trí indicator
        },

        animationEnabled: true, // Bật hiệu ứng chuyển động
        swipeEnabled: true, // Bật tính năng swipe giữa các tab
        tabBarStyle: {
          marginTop: 10,
          backgroundColor: appColors.white2,
          elevation: 0, // Bỏ bóng của tab
          height: 50, // Tăng chiều cao tabBar
          borderRadius: 25, // Làm tròn góc trên
          marginHorizontal: 15,
        },
      }}
    >
      <Tab.Screen name="Dư nợ">
        {(props) => (
          <DebtTab
            {...props}
            eventId={eventId}
            totalBudget={totalBudget}
            actualExpenses={actualExpenses}
            members={members}
            onDataChange={handleDataChange}
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
         onDataChange={fetchExpenses} // Gọi lại hàm fetchExpenses khi có thay đổi

       />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ExpensesNavigator;
