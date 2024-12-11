import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import TextComponent from "../../../../components/TextComponent";
import { SectionComponent, RowComponent, SpaceComponent } from "../../../../components";
import { appColors } from "../../../../constants/appColors";
import { fontFamily } from "../../../../constants/fontFamilies";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";
import { FAB } from "react-native-paper";
import AddBudgetModal from "../../../../modals/eventModals/AddBudgetModal";
import AddActualExpense from "../../../../modals/eventModals/AddActualExpense";
import AddMemberModal from "../../../../modals/eventModals/AddMemberModal";
import expenseAPI from "../../../../apis/expenseApi";

interface TransactionsTabProps {
  actualExpenses: any[];
  totalBudget: any;
  eventId: string;
  onRefresh: () => void;
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "đ");
};

const TransactionsTab: React.FC<TransactionsTabProps> = ({
  actualExpenses,
  totalBudget,
  eventId,
  onRefresh
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const totalPaid = actualExpenses?.reduce(
    (sum: number, expense: { amount: number }) => sum + expense.amount,
    0
  );
  const remainingBudget = (totalBudget?.amount || 0) - totalPaid;

  const handleActionPress = (action: string) => {
    setIsFabOpen(false);
    if (action === "addSchedule") {
      navigation.navigate("AddNewSchedule", { eventId });
    } else if (action === "addMember") {
      setShowAddMemberModal(true);
    }
  };

  const handleSaveBudget = async (data: { title: string; amount: string; addedBy: string }) => {
    try {
      await expenseAPI.HandleExpense(
        `/${eventId}/budget`,
        { ...data, amount: parseFloat(data.amount) },
        "put"
      );
      setShowBudgetModal(false);
      onRefresh();
    } catch (error) {
      console.error("Lỗi khi thêm tổng ngân sách:", error);
    }
  };

  const handleSaveExpense = async (data: {
    name: string;
    amount: string;
    category: string;
    date: string;
  }) => {
    try {
      console.log("Gửi dữ liệu đến server:", {
        name: data.name,
        amount: parseFloat(data.amount),
        category: data.category,
        date: data.date,
      });

      const response = await expenseAPI.HandleExpense(
        `/${eventId}/expenses`,
        {
          name: data.name,
          amount: parseFloat(data.amount),
          category: data.category,
          date: data.date,
        },
        "post"
      );

      if (!response.data?.actualExpenses) {
        console.error("Dữ liệu trả về từ server không hợp lệ:", response.data);
        alert("Lỗi: Không thể cập nhật danh sách chi tiêu.");
      }

      setShowExpenseModal(false);
      onRefresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Lỗi khi thêm chi tiêu:",
          error.message || "Lỗi không xác định"
        );
      } else {
        console.error("Lỗi khi thêm chi tiêu:", "Lỗi không xác định");
      }
      alert("Lỗi khi thêm chi tiêu");
    }
  };

  const handleMemberAdded = (email: string) => {
    setShowAddMemberModal(false);
    onRefresh();
  };

  return (
    <View style={styles.container}>
      <SectionComponent styles={[styles.overview]}>
        <TextComponent text="Tổng Quan" font={fontFamily.bold} size={18} title />
        <SpaceComponent height={10} />
        <RowComponent justify="space-between">
          <View>
            <TextComponent text="Tổng Ngân Sách" size={14} />
            <TextComponent
              text={formatCurrency(totalBudget?.amount || 0)}
              font={fontFamily.bold}
              size={16}
              color={appColors.green}
            />
          </View>
          <View>
            <TextComponent text="Đã Chi Tiêu" size={14} />
            <TextComponent
              text={formatCurrency(totalPaid || 0)}
              font={fontFamily.bold}
              size={16}
              color={appColors.danger}
            />
          </View>
          <View>
            <TextComponent text="Số Dư Còn Lại" size={14} />
            <TextComponent
              text={formatCurrency(remainingBudget || 0)}
              font={fontFamily.bold}
              size={16}
            />
          </View>
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={[styles.expenseList]}>
        <TextComponent text="Danh Sách Chi Tiêu" font={fontFamily.bold} size={18} styles={styles.sectionTitle} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={actualExpenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ExpenseDetailScreen", {
                  eventId: eventId,
                  expenseId: item._id,
                })
              }
            >
              <View style={styles.expenseItem}>
                <RowComponent justify="space-between">
                  <TextComponent text={item.name} font={fontFamily.medium} size={16} />
                  <TextComponent
                    text={formatCurrency(item.amount)}
                    font={fontFamily.medium}
                    size={16}
                    color={appColors.black}
                  />
                </RowComponent>
                <TextComponent
                  text={`Ngày: ${new Date(item.date).toLocaleDateString("vi-VN")}`}
                  size={14}
                  color={appColors.gray}
                />
                <TextComponent text={`Danh Mục: ${item.category}`} size={14} color={appColors.primary} />
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <TextComponent
              text="Không có khoản chi tiêu nào."
              size={14}
              color={appColors.gray}
              styles={styles.emptyMessage}
            />
          }
        />
      </SectionComponent>

      <FAB.Group
        visible={true}
        open={isFabOpen}
        icon={isFabOpen ? "close" : "plus"}
        actions={[
          {
            icon: "cash-plus",
            label: "Thêm Tổng Tiền",
            onPress: () => setShowBudgetModal(true),
          },
          {
            icon: "clipboard-plus",
            label: "Thêm Chi Tiêu",
            onPress: () => setShowExpenseModal(true),
          },
          {
            icon: "calendar-plus",
            label: "Thêm Lịch Trình",
            onPress: () => handleActionPress("addSchedule"),
          },
          {
            icon: "account-plus",
            label: "Thêm Thành Viên",
            onPress: () => handleActionPress("addMember"),
          },
        ]}
        onStateChange={({ open }) => setIsFabOpen(open)}
        style={{
          position: "absolute",
          bottom: -30,
          right: 8,
          borderRadius: 100,
        }}
      />
      <AddBudgetModal
        visible={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onSave={handleSaveBudget}
        eventId={eventId}
      />
      <AddActualExpense
        visible={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onSave={handleSaveExpense}
        eventId={eventId}
      />
      <AddMemberModal
        visible={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onSave={handleMemberAdded}
        eventId={eventId}
      />
    </View>
  );
};

export default TransactionsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  overview: {
    backgroundColor: appColors.white,
    borderRadius: 25,
    padding: 15,
    marginVertical: 20,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  expenseList: {
    backgroundColor: appColors.white,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    flex: 1,
  },
  expenseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    marginBottom: 10,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
  },
});
