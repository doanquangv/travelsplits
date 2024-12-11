// EditExpenseScreen.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";
import expenseAPI from "../../../../apis/expenseApi";
import { appColors } from "../../../../constants/appColors";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TimePicker } from "../../../../components";
import TextComponent from "../../../../components/TextComponent";
import { fontFamily } from "../../../../constants/fontFamilies";
import { ArrowLeft } from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

type EditExpenseRouteProp = RouteProp<RootStackParamList, "EditExpenseScreen">;

const defaultCategories = [
  { label: "Ăn uống", value: "Ăn uống" },
  { label: "Đi lại", value: "Đi lại" },
  { label: "nghỉ dưỡng", value: "nghỉ dưỡng" },
  { label: "Mua sắm", value: "Mua sắm" },
  { label: "Vui chơi", value: "Vui chơi" },
  { label: "Khác", value: "Khác" },
];

const EditExpenseScreen = () => {
  const route = useRoute<EditExpenseRouteProp>();
  const navigation = useNavigation();
  const { eventId, expenseId } = route.params as { eventId: string; expenseId: string };

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const fetchExpenseDetail = async () => {
    try {
      const res = await expenseAPI.HandleExpense(`/${eventId}`);
      if (res && res.data && Array.isArray(res.data.actualExpenses)) {
        const found = res.data.actualExpenses.find((item: any) => item._id === expenseId);
        if (found) {
          setExpense({
            name: found.name,
            amount: found.amount.toString(),
            category: found.category,
            date: new Date(found.date).toISOString(),
          });
        }
      }
    } catch (error) {
      console.error("Lỗi tải chi tiêu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetail();
  }, [eventId, expenseId]);

  const handleSave = async () => {
    try {
      const payload = {
        name: expense.name,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: expense.date,
      };
      const response = await expenseAPI.HandleExpense(
        `/${eventId}/expenses/${expenseId}`,
        payload,
        "put"
      );
      Alert.alert("Thành công", "Cập nhật khoản chi tiêu thành công.");
      
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật khoản chi tiêu.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <TextComponent text="Đang tải dữ liệu..." />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{flex:1, padding:16}}>
        <RowComponent justify="space-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={28} color={appColors.black} />
            </TouchableOpacity>
            <TextComponent text="Chỉnh Sửa Chi Tiêu" size={20} font={fontFamily.bold} />
            <View style={{width:48}}></View>{/* Placeholder để cân bằng layout */}
        </RowComponent>

        <SpaceComponent height={20} />

        <SectionComponent styles={{backgroundColor:appColors.white, borderRadius:10, padding:20}}>
            <ScrollView contentContainerStyle={{paddingBottom:20}}>
            <InputComponent
                placeholder="Tên khoản chi"
                value={expense.name}
                onChange={(text) => setExpense({ ...expense, name: text })}
            />

            <InputComponent
                placeholder="Số tiền"
                type="numeric"
                value={expense.amount}
                onChange={(text) => setExpense({ ...expense, amount: text })}
            />

            <TouchableOpacity
                onPress={() => setShowCategoryModal(true)}
                style={styles.categoryPicker}
            >
                <TextComponent
                text={expense.category ? expense.category : "Chọn danh mục..."}
                color={expense.category ? appColors.text : appColors.gray}
                />
            </TouchableOpacity>

            <TimePicker
                label="Ngày chi tiêu"
                type="date"
                selected={new Date(expense.date)}
                onSelect={(date) => setExpense({ ...expense, date: date.toISOString() })}
            />

            <SpaceComponent height={20} />
            <ButtonComponent text="Lưu" type="primary" onPress={handleSave}/>
            </ScrollView>
        </SectionComponent>

        {showCategoryModal && (
            <View style={styles.categoryModalContainer}>
            <View style={styles.categoryModalContent}>
                <TextComponent
                text="Chọn Danh Mục"
                title
                styles={{ marginBottom: 20 }}
                />
                {defaultCategories.map((cat) => (
                <TouchableOpacity
                    key={cat.value}
                    onPress={() => {
                    setExpense({ ...expense, category: cat.value });
                    setShowCategoryModal(false);
                    }}
                    style={styles.categoryItem}
                >
                    <TextComponent text={cat.label} />
                </TouchableOpacity>
                ))}
                <SpaceComponent height={10}/>
                <ButtonComponent 
                text="Đóng"
                onPress={() => setShowCategoryModal(false)}
                type="primary"
                />
            </View>
            </View>
        )}
        </View>
      
    </SafeAreaView>
  </LinearGradient>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  categoryPicker: {
    padding: 15,
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: appColors.white,
  },
  categoryModalContainer: {
    position:"absolute",
    top:0,left:0,right:0,bottom:0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  categoryModalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
});

