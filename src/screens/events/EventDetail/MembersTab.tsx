// client/travelsplits/src/screens/events/MembersTab.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { appColors } from "../../../constants/appColors";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { globalStyles } from "../../../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { ButtonComponent } from "../../../components";
import { fontFamily } from "../../../constants/fontFamilies";
import memberAPI from "../../../apis/memberApi";
import AddMemberModal from "../../../modals/eventModals/AddMemberModal";
import { Member } from "../../../models/memberModel";
import { Trash } from "iconsax-react-native";
import expenseAPI from "../../../apis/expenseApi";
import { FAB } from "react-native-paper";
import AddBudgetModal from "../../../modals/eventModals/AddBudgetModal";
import AddActualExpense from "../../../modals/eventModals/AddActualExpense";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations/types";

interface MembersTabProps {
  eventId: string;
  onRefresh: () => void;
}

const MembersTab: React.FC<MembersTabProps> = ({ eventId, onRefresh }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [membersData, setMembersData] = useState<Member[]>([]);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddMemberModalFromFab, setShowAddMemberModalFromFab] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await memberAPI.getEventMembers(eventId);      
      if (res && Array.isArray(res)) {
        setMembersData(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setMembersData(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thành viên:", error);
    }
  };
  
  // Sử dụng trong useEffect
  useEffect(() => {
    if (eventId) {
      fetchMembers();
    }
  }, [eventId]);

  const handleRemoveMember = (memberId: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa thành viên này không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy xóa thành viên"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await memberAPI.removeMemberFromEvent(eventId, memberId);
              Alert.alert("Thành công", "Xóa thành viên thành công.");
              fetchMembers(); // Cập nhật lại danh sách thành viên sau khi xóa thành công
              onRefresh(); // Cập nhật lại dữ liệu tr
            } catch (error) {
              console.error("Lỗi khi xóa thành viên:", error);
              Alert.alert("Lỗi", "Không thể xóa thành viên. Vui lòng thử lại.");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  
  
  // Sử dụng khi thành viên mới được thêm
  const handleMemberAdded = (email: string) => {
    setIsAddMemberModalVisible(false);
    setShowAddMemberModalFromFab(false);
    fetchMembers(); // Cập nhật danh sách sau khi thêm thành viên
    onRefresh(); // Cập nhật lại dữ liệu tr
  };
  

  const handleAddMemberPress = () => {
    setIsAddMemberModalVisible(true);
  }
  
  const handleCloseAddMemberModal = () => {
    setIsAddMemberModalVisible(false);
    setShowAddMemberModalFromFab(false);
  };

  const handleActionPress = (action: string) => {
    setIsFabOpen(false);
    if (action === "addSchedule") {
      // Điều hướng sang thêm lịch trình
      // Giả sử bạn đã có navigation, tùy vào code gốc của bạn
      navigation.navigate("AddNewSchedule", { eventId });
    } else if (action === "addMember") {
      setShowAddMemberModalFromFab(true);
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

  

  const renderMemberItem = ({ item }: { item: Member }) => (
    <CardComponent styles={[globalStyles.card, styles.memberCard]}>
      <View style={styles.memberIcon}>
        <View
          style={[
            styles.memberInitial,
            {
              backgroundColor: item.role === "host" ? appColors.primary : appColors.green,
            },
          ]}
        >
          <TextComponent
            text={ item.userId?.email?.charAt(0)} // Truy cập name từ item.userId
            color={appColors.white}
            size={18}
          />
        </View>
      </View>
      <View style={styles.memberDetails}>
        <TextComponent text={item.userId?.fullname || "???"} font="Roboto-Medium" size={16} />
        <TextComponent text={item.userId?.email || "No Email"} size={14} color={appColors.black} />
      </View>
      {item.role !== "host" && ( // Không cho phép xóa host
            <TouchableOpacity onPress={() => handleRemoveMember(item.userId._id)}>
                <Trash  color={appColors.danger} size={20} />
            </TouchableOpacity>
        )}
    </CardComponent>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMemberPress}>
          <Ionicons name="add-circle-outline" size={24} color={appColors.primary} />
          <TextComponent
            text="Thêm thành viên"
            color={appColors.primary}
            styles={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={membersData}
        keyExtractor={(item) => item._id}
        renderItem={renderMemberItem}
        contentContainerStyle={styles.listContent}
        // style={{ flex: 1 }}
      />

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
          bottom: -5,
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
        visible={isAddMemberModalVisible || showAddMemberModalFromFab}
        onClose={handleCloseAddMemberModal}
        onSave={handleMemberAdded}
        eventId={eventId}
      />

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white2,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  addMemberButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    backgroundColor: appColors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  memberIcon: {
    marginRight: 12,
  },
  memberInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  memberDetails: {
    flex: 1,
  },
  roleBadge: {
    backgroundColor: appColors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default MembersTab;
