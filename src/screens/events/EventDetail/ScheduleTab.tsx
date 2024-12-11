// client/travelsplits/src/screens/events/ScheduleTab.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { appColors } from "../../../constants/appColors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { globalStyles } from "../../../styles/globalStyles";
import { ButtonComponent } from "../../../components";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Schedule } from "../../../models/ScheduleModel";
import scheduleAPI from "../../../apis/scheduleApi";
import { RootStackParamList } from "../../../navigations/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Modalize } from "react-native-modalize";
import AddNewScheduleModal from "../../../modals/eventModals/AddScheduleModal";
import { ActivityIndicator, FAB } from "react-native-paper";
import expenseAPI from "../../../apis/expenseApi";
import AddBudgetModal from "../../../modals/eventModals/AddBudgetModal";
import AddActualExpense from "../../../modals/eventModals/AddActualExpense";
import AddMemberModal from "../../../modals/eventModals/AddMemberModal";

interface ScheduleTabProps {
  eventId: string;
  onRefresh: () => void;
}

type ScheduleTabRouteProp = RouteProp<RootStackParamList, "ScheduleTab">;
type ScheduleTabNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ScheduleTab"
>;

const ScheduleTab: React.FC<ScheduleTabProps> = ({ eventId, onRefresh }) => {
  const navigation = useNavigation<ScheduleTabNavigationProp>();

  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);

    try {
      const res = await scheduleAPI.getSchedules(eventId);
      if (res) {
        setScheduleData(res.data);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSchedules();
    }, [eventId])
  );

  const handleSchedulePress = (item: Schedule) => {
    navigation.navigate("ScheduleDetailScreen", {
      eventId,
      scheduleId: item._id,
    });
  };

  const handleAddSchedule = () => {
    navigation.navigate("AddNewSchedule", { eventId });
  };

  const handleActionPress = (action: string) => {
    setIsFabOpen(false);
    if (action === "addSchedule") {
      handleAddSchedule();
    } else if (action === "addMember") {
      setShowAddMemberModal(true);
    }
  };

  const handleSaveBudget = async (data: {
    title: string;
    amount: string;
    addedBy: string;
  }) => {
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
  const renderScheduleItem = ({ item }: { item: Schedule }) => (
    <TouchableOpacity onPress={() => handleSchedulePress(item)}>
      <CardComponent styles={[globalStyles.card, styles.scheduleCard]}>
        <View style={styles.scheduleIcon}>
          <FontAwesome5
            name="calendar-check"
            size={24}
            color={appColors.primary}
          />
        </View>
        <View style={styles.scheduleDetails}>
          <TextComponent text={item.name} font="Roboto-Medium" size={16} />
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Ionicons
              name="location-sharp"
              size={16}
              color={appColors.primary}
            />
            <TextComponent
              text={item.address}
              size={14}
              styles={{ marginLeft: 5 }}
            />
          </View>
          {/* <TextComponent
            text={item.address}
            size={14}
            color={appColors.gray}
            styles={{ marginTop: 5 }}
          /> */}
        </View>
      </CardComponent>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonComponent
            text="Th 7, 23/11"
            type="link"
            styles={styles.dateButton}
            color={appColors.primary}
          />
        </ScrollView>
      </View>

      <ButtonComponent
        text="Thêm hoạt động"
        type="primary"
        onPress={handleAddSchedule}
      />

      {loading ? (
        <View>
          <ActivityIndicator size={20} color={appColors.primary} />
        </View>
      ) : scheduleData.length === 0 ? (
        <TextComponent text="Không có lịch trình nào." />
      ) : (
        <FlatList
          data={scheduleData}
          keyExtractor={(item) => item._id}
          renderItem={renderScheduleItem}
          refreshing={loading}
          onRefresh={fetchSchedules}
          contentContainerStyle={styles.listContent}
        />
      )}

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
        visible={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onSave={handleMemberAdded}
        eventId={eventId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: appColors.white2,
  },
  header: {
    marginBottom: 16,
  },
  dateButton: {
    borderColor: appColors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addActivityButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  listContent: {
    paddingBottom: 80,
  },
  scheduleCard: {
    flexDirection: "row",
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
  scheduleIcon: {
    marginRight: 12,
  },
  scheduleDetails: {
    flex: 1,
  },
});

export default ScheduleTab;
