import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import TextComponent from "../../../../components/TextComponent";
import { SectionComponent, RowComponent, SpaceComponent } from "../../../../components";
import { appColors } from "../../../../constants/appColors";
import { fontFamily } from "../../../../constants/fontFamilies";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";

interface TransactionsTabProps {
  actualExpenses: any[];
  totalBudget: any;
  eventId: string;
  onDataChange: () => void;
}
const formatCurrency = (value: number): string => {
  return value
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "đ");
};

const TransactionsTab: React.FC<TransactionsTabProps> = ({
  actualExpenses,
  totalBudget,
  eventId,
  onDataChange
}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const totalPaid = actualExpenses?.reduce(
    (sum: number, expense: { amount: number }) => sum + expense.amount,
    0
  );
  const remainingBudget = (totalBudget?.amount || 0) - totalPaid;
  
  return (
    <View style={styles.container}>
      {/* Tổng Quan */}
      <SectionComponent styles={[styles.overview]}>
        <TextComponent
          text="Tổng Quan"
          font={fontFamily.bold}
          size={18}
          title
        />
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

      {/* Danh Sách Chi Tiêu */}
      <SectionComponent styles={[styles.expenseList]}>
        <TextComponent
          text="Danh Sách Chi Tiêu"
          font={fontFamily.bold}
          size={18}
          styles={styles.sectionTitle}
        />
        <FlatList
          showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc

          data={actualExpenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ExpenseDetailScreen", {
                  eventId: eventId,
                  expenseId: item._id, // truyền id khoản chi tiêu
                  onDataChange, // Truyền callback vào màn hình chi tiết

                })
              }
            //   style={styles.expenseItemWrapper}
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
                <TextComponent
                  text={`Danh Mục: ${item.category}`}
                  size={14}
                  color={appColors.primary}
                />
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
    </View>
  );
};

export default TransactionsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: appColors.white2,
    paddingHorizontal: 15,
    
  },
  overview: {
    backgroundColor: appColors.white,
    borderRadius: 25,
    padding: 15,
    marginVertical: 20,
    elevation: 2, // Hiệu ứng đổ bóng nhẹ
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
