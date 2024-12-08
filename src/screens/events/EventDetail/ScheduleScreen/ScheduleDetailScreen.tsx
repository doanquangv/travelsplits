// client/travelsplits/src/screens/events/EventDetail/ScheduleDetail.tsx

import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../../navigations/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { Schedule } from "../../../../models/ScheduleModel";
import scheduleAPI from "../../../../apis/scheduleApi";
import ContainerComponent from "../../../../components/ContainerComponent";
import TextComponent from "../../../../components/TextComponent";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../../../components";
import { ArrowLeft, ArrowLeft2 } from "iconsax-react-native";
import { appColors } from "../../../../constants/appColors";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { ActivityIndicator } from "react-native-paper";

type ScheduleDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ScheduleDetailScreen"
>;

type ScheduleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ScheduleDetailScreen"
>;

type Props = {
  navigation: ScheduleDetailScreenNavigationProp;
  route: ScheduleDetailScreenRouteProp;
};

const ScheduleDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId, scheduleId } = route.params;
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const modalizeRef = useRef<Modalize>(null); // Modal reference

  
  const fetchScheduleDetails = async () => {
    try {
      const res = await scheduleAPI.getSchedule(eventId, scheduleId); // Sử dụng getSchedule với eventId và scheduleId
      if (res && res.data) {
        setSchedule(res.data);
      }
    } catch (error) {
      console.error("Error fetching schedule details:", error);
      // Alert.alert("Lỗi", "Có lỗi xảy ra khi lấy chi tiết lịch trình.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchScheduleDetails();
    }, [])
  )

  const handleEditSchedule = () => {
    modalizeRef.current?.close();

    navigation.navigate("EditScheduleScreen", { eventId, scheduleId });
  };

  const handleDeleteSchedule = () => {
    modalizeRef.current?.close();

    Alert.alert("Xác Nhận Xóa", "Bạn có chắc chắn muốn xóa lịch trình này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: confirmDelete },
    ]);
  };

  const confirmDelete = async () => {
    try {
      await scheduleAPI.deleteSchedule(eventId, scheduleId);
      Alert.alert("Thành công", "Xóa lịch trình thành công.");
   
      navigation.goBack(); // Hoặc navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa lịch trình.");
    }
  };
  

  if (loading) {
    return (
      <ContainerComponent>
          <ActivityIndicator size={20} color={appColors.primary} />
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
    <View style={{flex:1}}>
          <RowComponent justify="space-between">
          <TouchableOpacity
            style={{ width: 48, height: 48, justifyContent: "center",marginLeft:10 }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={28} color={appColors.black} />
          </TouchableOpacity>

         <TextComponent text={schedule.name} title size={25} styles={{}} />
         <TouchableOpacity
            style={{ width: 48, height: 48, justifyContent: "center" }}
            onPress={() => modalizeRef.current?.open()}
          >
            <Feather name="settings" size={20} color={appColors.black} />
          </TouchableOpacity>
        </RowComponent>

        <SectionComponent styles={{}}>
        <SpaceComponent height={20} />

        <RowComponent justify="flex-start">
        <Ionicons name="location-outline" size={20} color={appColors.primary} />
        <TextComponent
          text={schedule.address}
          styles={{ marginLeft: 8 }}
        />
      </RowComponent>
      <SpaceComponent height={10} />

      <RowComponent justify="flex-start">
      <MaterialIcons name="calendar-today" size={20} color={appColors.primary} />
        <TextComponent
          text={new Date(schedule.date).toLocaleDateString()}
          styles={{ marginLeft: 8 }}
        />
      </RowComponent>
      <SpaceComponent height={10} />

      <RowComponent justify="flex-start">
      <Ionicons name="time-outline" size={20} color={appColors.primary} />
        <TextComponent
          text={`Bắt đầu: ${new Date(schedule.startAt).toLocaleTimeString()}`}
          styles={{ marginLeft: 8 }}
        />
      </RowComponent>
      <SpaceComponent height={10} />

      <RowComponent justify="flex-start">
      <Ionicons name="time-outline" size={20} color={appColors.primary} />
        <TextComponent
          text={`Kết thúc: ${new Date(schedule.endAt).toLocaleTimeString()}`}
          styles={{ marginLeft: 8 }}
        />
      </RowComponent>

      
    </SectionComponent>

      {/* Nút Chỉnh sửa và Xóa */}
      <Modalize ref={modalizeRef} modalHeight={200}>
        <View style={{padding:20}} >
          <ButtonComponent type="primary" text="Chỉnh sửa lịch trình này" color={appColors.primary} onPress={handleEditSchedule}/>
          <SpaceComponent height={10} />
          <ButtonComponent type="primary" text="Xóa lịch trình này" color={appColors.danger} onPress={handleDeleteSchedule}/>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: appColors.primary,
  },
  deleteButton: {
    backgroundColor: appColors.danger,
  },
});


export default ScheduleDetailScreen;
