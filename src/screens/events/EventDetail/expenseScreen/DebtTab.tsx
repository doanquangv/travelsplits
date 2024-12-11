// DebtTab.tsx

import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { appColors } from "../../../../constants/appColors";
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../../../components";
import { globalStyles } from "../../../../styles/globalStyles";
import TextComponent from "../../../../components/TextComponent";
import CardComponent from "../../../../components/CardComponent";
import { fontFamily } from "../../../../constants/fontFamilies";
import { MoneyRecive, MoneySend } from "iconsax-react-native";
import { FAB } from "react-native-paper";
import AddBudgetModal from "../../../../modals/eventModals/AddBudgetModal";
import expenseAPI from "../../../../apis/expenseApi";
import AddActualExpense from "../../../../modals/eventModals/AddActualExpense";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";
import AddMemberModal from "../../../../modals/eventModals/AddMemberModal";

interface DebtTabProps {
  eventId: string;
  totalBudget: any;
  actualExpenses: any[];
  members: any[];
  onRefresh: () => void;
}

const formatCurrency = (value: number): string => {
  return value
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "đ");
};

const DebtTab: React.FC<DebtTabProps> = ({
  eventId,
  totalBudget,
  actualExpenses,
  members,
  onRefresh,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isFabOpen, setIsFabOpen] = useState(false); // Trạng thái mở/đóng FAB
  const [showBudgetModal, setShowBudgetModal] = useState(false); // Trạng thái modal
  const [showExpenseModal, setShowExpenseModal] = useState(false); // Trạng thái modal chi tiêu
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const totalPaid = actualExpenses?.reduce(
    (sum: number, expense: { amount: number }) => sum + expense.amount,
    0
  );
  const numberOfMembers = members.length || 1;
  const difference = (totalBudget?.amount || 0) - (totalPaid || 0);
  const memberDebt = difference / numberOfMembers;

  const handleActionPress = (action: string) => {
    setIsFabOpen(false);
    if (action === "addSchedule") {
      navigation.navigate("AddNewSchedule", { eventId });
    } else if (action === "addMember") {
      setShowAddMemberModal(true);
    }    // Nếu bạn muốn hiển thị modal thêm lịch trình, thêm thành viên, có thể xử lý ở đây
  };

  const handleSaveBudget = async (data: {
    title: string;
    amount: string;
    addedBy: string;
  }) => {
    try {
      const response = await expenseAPI.HandleExpense(
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
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <SectionComponent
          styles={[
            globalStyles.shadow,
            {
              backgroundColor: appColors.white,
              borderRadius: 25,
              marginVertical: 25,
              marginHorizontal: 15,
            },
          ]}
        >
          <View style={[globalStyles.center, { paddingTop: 20 }]}>
            <TextComponent text="Số dư nợ của bạn:" size={18} />
            <TextComponent
              text={`${formatCurrency(memberDebt)}`}
              font={fontFamily.bold}
              size={24}
            />
          </View>
          <SpaceComponent height={20} />
          <RowComponent justify="space-around">
            <RowComponent>
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#bae0bd"
              >
                <MoneyRecive size={20} color={appColors.green} />
              </CardComponent>
              <View style={{ paddingLeft: 10 }}>
                <TextComponent text="Tổng tiền:" />
                <TextComponent
                  text={` ${formatCurrency(totalBudget?.amount || 0)}`}
                  font={fontFamily.bold}
                  numberOfLines={1}
                />
              </View>
            </RowComponent>

            <View
              style={{
                width: 1,
                backgroundColor: appColors.gray,
                marginHorizontal: 10,
                height: 45,
              }}
            ></View>

            <RowComponent>
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#f8a9a9"
              >
                <MoneySend color={appColors.danger} />
              </CardComponent>
              <View style={{ paddingLeft: 10 }}>
                <TextComponent text="Đã trả: " />
                <TextComponent
                  text={` ${formatCurrency(totalPaid || 0)}`}
                  font={fontFamily.bold}
                />
              </View>
            </RowComponent>
          </RowComponent>
        </SectionComponent>

        <SectionComponent
          styles={[
            globalStyles.shadow,
            {
              backgroundColor: appColors.white,
              borderRadius: 25,
              marginHorizontal: 15,
            },
          ]}
        >
          <TextComponent
            text="Số dư nợ khác"
            size={18}
            font={fontFamily.bold}
            styles={{ paddingTop: 10 }}
          />
          <View
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: appColors.border,
                paddingTop: 15,
              },
            ]}
          ></View>
          {/* Danh sách thành viên và số dư nợ */}
          <View>
            {members.map((member) => (
              <RowComponent
                justify="space-between"
                styles={[{ paddingVertical: 15 }]}
                key={member.userId._id}
              >
                <RowComponent>
                  <CircleComponent>
                    <View></View>
                  </CircleComponent>
                  <TextComponent
                    text={member.userId.fullname || member.userId.email}
                    size={16}
                    font={fontFamily.medium}
                    styles={{ paddingLeft: 5 }}
                  />
                </RowComponent>
                <TextComponent
                  text={`${formatCurrency(memberDebt)}`}
                  size={16}
                  font={fontFamily.medium}
                  color={appColors.black}
                />
              </RowComponent>
            ))}
          </View>
        </SectionComponent>
      </ScrollView>

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
        style={styles.fabGroup}
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

export default DebtTab;

const styles = StyleSheet.create({
  fabGroup: {
    position: "absolute",
    bottom: -5,
    right: 8,
    borderRadius: 100,
  },
});
