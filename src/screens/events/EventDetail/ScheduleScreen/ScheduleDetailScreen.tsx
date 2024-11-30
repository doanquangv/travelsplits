// client/travelsplits/src/screens/events/EventDetail/ScheduleDetail.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { RootStackParamList } from "../../../../navigations/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Schedule } from "../../../../models/ScheduleModel";
import scheduleAPI from "../../../../apis/scheduleApi";
import ContainerComponent from "../../../../components/ContainerComponent";
import TextComponent from "../../../../components/TextComponent";
import { ButtonComponent, SectionComponent, SpaceComponent } from "../../../../components";


type ScheduleDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScheduleDetailScreen'
>;

type ScheduleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ScheduleDetailScreen'
>;

type Props = {
  navigation: ScheduleDetailScreenNavigationProp;
  route: ScheduleDetailScreenRouteProp;
};

const ScheduleDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId, scheduleId } = route.params;
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  const fetchScheduleDetails = async () => {
    try {
      const res = await scheduleAPI.getSchedules(scheduleId);
      if (res && res.data) {
        setSchedule(res.data);
      }
    } catch (error) {
      console.error("Error fetching schedule details:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi lấy chi tiết lịch trình.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSchedule = () => {
    navigation.navigate("EditScheduleScreen", { eventId, scheduleId });
  };

  const handleDeleteSchedule = () => {
    Alert.alert(
      "Xác Nhận Xóa",
      "Bạn có chắc chắn muốn xóa lịch trình này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: confirmDelete },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      await scheduleAPI.deleteSchedule(scheduleId);
      Alert.alert("Thành công", "Xóa lịch trình thành công.");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa lịch trình.");
    }
  };

  if (loading) {
    return (
      <ContainerComponent>
        <TextComponent text="Đang tải..." />
      </ContainerComponent>
    );
  }

  if (!schedule) {
    return (
      <ContainerComponent>
        <TextComponent text="Không tìm thấy lịch trình." />
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent>
      <SectionComponent>
        <TextComponent text={schedule.name} title />
      </SectionComponent>
      <SpaceComponent height={10} />

      <TextComponent text={`Mô tả: ${schedule.description}`} />
      <SpaceComponent height={10} />

      <TextComponent text={`Địa chỉ: ${schedule.address}`} />
      <SpaceComponent height={10} />

      <TextComponent text={`Ngày: ${new Date(schedule.date).toLocaleDateString()}`} />
      <SpaceComponent height={10} />

      <TextComponent text={`Thời gian bắt đầu: ${new Date(schedule.startAt).toLocaleTimeString()}`} />
      <SpaceComponent height={10} />

      <TextComponent text={`Thời gian kết thúc: ${new Date(schedule.endAt).toLocaleTimeString()}`} />
      <SpaceComponent height={10} />

      <TextComponent text={`Vị trí: Lat ${schedule.position.lat}, Lng ${schedule.position.lng}`} />
      <SpaceComponent height={10} />

      {/* Nút Chỉnh sửa và Xóa */}
      <SectionComponent>
        <ButtonComponent text="Chỉnh sửa" onPress={handleEditSchedule}  />
        <SpaceComponent height={10} />
        <ButtonComponent text="Xóa" onPress={handleDeleteSchedule}  />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  // Thêm các kiểu nếu cần
});

export default ScheduleDetailScreen;
