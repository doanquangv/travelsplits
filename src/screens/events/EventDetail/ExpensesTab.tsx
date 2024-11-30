
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { appColors } from "../../../constants/appColors";
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../../components";
import { globalStyles } from "../../../styles/globalStyles";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { fontFamily } from "../../../constants/fontFamilies";
import { MoneyRecive, MoneySend } from "iconsax-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";
import AddBudgetModal from "../../../modals/eventModals/AddBudgetModal";
import expenseAPI from "../../../apis/expenseApi";
import AddActualExpense from "../../../modals/eventModals/AddActualExpense";

interface ExpensesTabProps {
  eventId: string;
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "đ");
};

const ExpensesTab: React.FC<ExpensesTabProps> = ({ eventId }) => {
  const [isFabOpen, setIsFabOpen] = useState(false); // Trạng thái mở/đóng FAB
  const [showBudgetModal, setShowBudgetModal] = useState(false); // Trạng thái modal
  const [showExpenseModal, setShowExpenseModal] = useState(false); // Trạng thái modal chi tiêu
  


  const [totalBudget, setTotalBudget] = useState<any>(null); // Chỉ lưu thông tin ngân sách tổng
  const [actualExpenses, setActualExpenses] = useState<any[]>([]); // Chỉ lưu danh sách chi tiêu
  
  const [loading, setLoading] = useState(false); // Trạng thái loading

  
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await expenseAPI.HandleExpense(`/${eventId}`);
      
      // console.log(res.data);
      // Kiểm tra dữ liệu trả về và đảm bảo nó có tồn tại
      if (res && res.data) {
        const { totalBudget, actualExpenses } = res.data;
        setTotalBudget(totalBudget ? totalBudget :  { amount: 0, title: '', addedBy: '' });
        setActualExpenses(Array.isArray(actualExpenses) ? actualExpenses : []);      } 
      else {
          console.error("Dữ liệu trả về từ server không hợp lệ:", res);
          setTotalBudget({ amount: 0, title: '', addedBy: '' });
          setActualExpenses([]);     }
  
    }  catch (error) {
      console.error("Lỗi khi tải chi phí:", error);
      setTotalBudget({ amount: 0, title: '', addedBy: '' }); // Đặt tổng ngân sách thành giá trị mặc định
      setActualExpenses([]); // Đặt danh sách chi phí thành rỗng nếu gặp lỗi
    } finally {
        setLoading(false);
    }
  };
  
  
    useEffect(() => {
      fetchExpenses();
    }, [eventId]);
    // console.log("totalBudget", totalBudget);
    // console.log("actualExpenses", actualExpenses);
    

  const handleActionPress = (action: string) => {
    setIsFabOpen(false); // Đóng FAB sau khi chọn hành động
    console.log("Selected Action:", action); // Thay thế bằng logic của bạn
    if (action === "addBudget") {
      // Hiển thị modal để thêm tổng tiền
    } else if (action === "addExpense") {
      // Hiển thị modal để thêm chi tiêu
    } else if (action === "addSchedule") {
      // Hiển thị modal để thêm lịch trình
    } else if (action === "addMember") {
      // Hiển thị modal để thêm thành viên
    }
  };

  const handleSaveBudget = async (data: { title: string; amount: string; addedBy: string }) => {
    try {
      const response = await expenseAPI.HandleExpense(
        `/${eventId}/budget`,
        { ...data, amount: parseFloat(data.amount) },
        "put"
      );
  
      // Cập nhật giao diện
      setTotalBudget(response.data); // Lưu dữ liệu mới
      await fetchExpenses();
      setShowBudgetModal(false); // Đóng modal
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
    
    // console.log("Phản hồi từ server:", response);
    setActualExpenses(response.data.actualExpenses); // Cập nhật danh sách chi phí
    setShowExpenseModal(false); // Đóng modal
  } catch (error: any) {
    console.error("Lỗi khi thêm chi tiêu:", error.message || "Lỗi không xác định");
    alert(`Lỗi khi thêm chi tiêu: ${error.message || "Lỗi không xác định"}`);
  }
};

  
const totalPaid = actualExpenses?.reduce(
  (sum: number, expense: { amount: number }) => sum + expense.amount,
  0
);


  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
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
            <TextComponent text="Số dư nợ: " size={18} />
            <TextComponent text='0 d' font={fontFamily.bold} size={24} />
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
                <TextComponent text={` ${formatCurrency(totalBudget?.amount || 0)}`} font={fontFamily.bold} />
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
                <TextComponent text={` ${formatCurrency(totalPaid || 0)}`} font={fontFamily.bold} />
              </View>
            </RowComponent>
          </RowComponent>
        </SectionComponent>

        {/* <SpaceComponent height={30} /> */}

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
          <View>
            <RowComponent
              justify="space-between"
              styles={[{ paddingVertical: 15 }]}
            >
              <RowComponent>
                <CircleComponent>
                  <View></View>
                </CircleComponent>
                <TextComponent
                  text="Đoàn Quang vũ"
                  size={16}
                  font={fontFamily.medium}
                  styles={{ paddingLeft: 5 }}
                />
              </RowComponent>
              <TextComponent
                text="0đ"
                size={16}
                font={fontFamily.medium}
                color={appColors.black}
              />
            </RowComponent>
            <RowComponent
              justify="space-between"
              styles={[{ paddingVertical: 15 }]}
            >
              <RowComponent>
                <CircleComponent>
                  <View></View>
                </CircleComponent>
                <TextComponent
                  text="Đoàn Quang B"
                  size={16}
                  font={fontFamily.medium}
                  styles={{ paddingLeft: 5 }}
                />
              </RowComponent>
              <TextComponent
                text="0đ"
                size={16}
                font={fontFamily.medium}
                color={appColors.black}
              />
            </RowComponent>
            <RowComponent
              justify="space-between"
              styles={[{ paddingVertical: 15 }]}
            >
              <RowComponent>
                <CircleComponent>
                  <View></View>
                </CircleComponent>
                <TextComponent
                  text="Đoàn Quang C"
                  size={16}
                  font={fontFamily.medium}
                  styles={{ paddingLeft: 5 }}
                />
              </RowComponent>
              <TextComponent
                text="0đ"
                size={16}
                font={fontFamily.medium}
                color={appColors.black}
              />
            </RowComponent>
          </View>
        </SectionComponent>
      </ScrollView>

      <FAB.Group
        visible={true}
        open={isFabOpen}
        icon={isFabOpen ? "close" : "plus"} // Icon chuyển đổi khi mở/đóng
        actions={[
          {
            icon: "cash-plus", // Biểu tượng cho thêm tổng tiền
            label: "Thêm Tổng Tiền",
            onPress: () => setShowBudgetModal(true),
          },
          {
            icon: "clipboard-plus", // Biểu tượng cho thêm chi tiêu
            label: "Thêm Chi Tiêu",
            onPress: () => setShowExpenseModal(true),
          },
          {
            icon: "calendar-plus", // Biểu tượng cho thêm lịch trình
            label: "Thêm Lịch Trình",
            onPress: () => handleActionPress("addSchedule"),
          },
          {
            icon: "account-plus", // Biểu tượng cho thêm thành viên
            label: "Thêm Thành Viên",
            onPress: () => handleActionPress("addMember"),
          },
        ]}
        onStateChange={({ open }) => setIsFabOpen(open)} // Thay đổi trạng thái mở/đóng FAB
        onPress={() => {
          // Nếu cần, bạn có thể thêm logic ở đây
        }}
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
        onSave={handleSaveExpense} // Callback xử lý thêm chi tiêu
        eventId={eventId}
      />

    </View>
  );
};

export default ExpensesTab;
const styles = StyleSheet.create({
  fabGroup: {
    position: "absolute",
    bottom: -5,
    right: 8,
    borderRadius: 100,
  },
});
