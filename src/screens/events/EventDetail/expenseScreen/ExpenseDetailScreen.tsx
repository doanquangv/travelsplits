// ExpenseDetailScreen.tsx

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types"; // Bạn cần định nghĩa type cho stack
import expenseAPI from "../../../../apis/expenseApi";
import { Modalize } from "react-native-modalize";
import { ArrowLeft, Edit, Trash } from "iconsax-react-native";
import { appColors } from "../../../../constants/appColors";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../../../components";
import TextComponent from "../../../../components/TextComponent";
import { ActivityIndicator } from "react-native-paper";
import { fontFamily } from "../../../../constants/fontFamilies";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";

type ExpenseDetailRouteProp = RouteProp<
  RootStackParamList,
  "ExpenseDetailScreen"
>;
type ExpenseDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ExpenseDetailScreen"
>;

const ExpenseDetailScreen = ({ onDataChange }: { onDataChange: () => void }) => { // Thêm onDataChange
    const navigation = useNavigation<ExpenseDetailScreenNavigationProp>();
    const route = useRoute<ExpenseDetailRouteProp>();
  const { eventId, expenseId } = route.params;

  const [expense, setExpense] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const modalizeRef = useRef<Modalize>(null);

  const fetchExpenseDetail = async () => {
    try {
      const res = await expenseAPI.HandleExpense(`/${eventId}`);
      // res.data = { totalBudget, actualExpenses }
      if (res && res.data && Array.isArray(res.data.actualExpenses)) {
        const found = res.data.actualExpenses.find(
          (item: any) => item._id === expenseId
        );
        setExpense(found || null);
      } else {
        setExpense(null);
      }
    } catch (error) {
      console.error("Error fetching expense detail:", error);
      setExpense(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetail();
  }, [eventId, expenseId]);

  

  const handleEditExpense = () => {
    navigation.navigate("EditExpenseScreen", { eventId, expenseId, onDataChange });

    // Điều hướng sang màn hình chỉnh sửa expense
    // navigation.navigate("EditExpenseScreen", { eventId, expenseId });
  };

  const formatCurrency = (value: number): string => {
    return value
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "đ");
  };
  const handleDeleteExpense = async () => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa khoản chi tiêu này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await expenseAPI.HandleExpense(`/${eventId}/expenses/${expenseId}`, {}, "delete");
            Alert.alert("Thành công", "Xóa khoản chi tiêu thành công.");
            onDataChange(); // Gọi lại callback để làm mới danh sách
            navigation.goBack();
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa khoản chi tiêu.");
            console.error(error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={20} color={appColors.primary} />
      </View>
    );
  }

  if (!expense) {
    return (
      <View style={styles.center}>
        <TextComponent text="Không tìm thấy khoản chi tiêu." />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <RowComponent justify="space-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={28} color={appColors.black} />
            </TouchableOpacity>
            <TextComponent
              text={expense.name}
              size={20}
              font={fontFamily.bold}
            />
            {/* Icons for edit and delete */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={handleEditExpense}
                style={{ marginHorizontal: 8 }}
              >
                <Edit size={24} color={appColors.black} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteExpense}
                style={{ marginHorizontal: 8 }}
              >
                <Trash size={24} color={appColors.danger} />
              </TouchableOpacity>
            </View>
          </RowComponent>
          <SpaceComponent height={20} />

          <SectionComponent
            styles={{
              backgroundColor: appColors.white,
              borderRadius: 10,
              padding: 16,
            }}
          >
            <TextComponent text={`Tên: ${expense.name}`} size={20} />
            <SpaceComponent height={10} />
            <TextComponent
              text={formatCurrency(expense.amount)}
              size={30}
              color={appColors.green}
            />
            <SpaceComponent height={10} />
            <TextComponent text={`Danh mục: ${expense.category}`} size={16} />
            <SpaceComponent height={10} />
            <TextComponent
              text={`Ngày: ${new Date(expense.date).toLocaleString("vi-VN")}`}
              size={16}
            />
          </SectionComponent>

          <Modalize ref={modalizeRef} modalHeight={200}>
            <View style={{ padding: 20 }}>
              <ButtonComponent
                type="primary"
                text="Chỉnh sửa khoản chi tiêu này"
                color={appColors.primary}
                onPress={handleEditExpense}
              />
              <SpaceComponent height={10} />
              <ButtonComponent
                type="primary"
                text="Xóa khoản chi tiêu này"
                color={appColors.danger}
                onPress={handleDeleteExpense}
              />
            </View>
          </Modalize>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseDetailScreen;
