import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";
import ContainerComponent from "../../../../components/ContainerComponent";
import TextComponent from "../../../../components/TextComponent";
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent } from "../../../../components";
import ChoiceLocation from "../../../../components/ChoiceLocation";
import { appColors } from "../../../../constants/appColors";
import scheduleAPI from "../../../../apis/scheduleApi";
import { Schedule } from "../../../../models/ScheduleModel";
import { ArrowLeft } from "iconsax-react-native";
import { ActivityIndicator } from "react-native-paper";

type EditScheduleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditScheduleScreen'
>;

type EditScheduleScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditScheduleScreen'
>;

type Props = {
  navigation: EditScheduleScreenNavigationProp;
  route: EditScheduleScreenRouteProp;
};


const EditScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId, scheduleId } = route.params;
  const [scheduleData, setScheduleData] = useState<Schedule | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartAtPicker, setShowStartAtPicker] = useState(false);
  const [showEndAtPicker, setShowEndAtPicker] = useState(false);

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  const fetchScheduleDetails = async () => {
    try {
      const res = await scheduleAPI.getSchedule(eventId, scheduleId);
      if (res && res.data ) {
        setScheduleData(res.data);
      } else {
        Alert.alert("Lỗi", "Không tìm thấy lịch trình.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error fetching schedule details:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi lấy chi tiết lịch trình.");
      navigation.goBack();
    }
  };

  const handleChangeValue = (key: keyof Schedule, value: any) => {
    if (scheduleData) {
      setScheduleData({
        ...scheduleData,
        [key]: value,
      });
    }
  };

  const handleChangePosition = (val: any) => {
    if (scheduleData) {
      setScheduleData({
        ...scheduleData,
        position: {
          lat: val.position.lat,
          long: val.position.long,
        },
        address: val.address,
      });
    }
  };

  const handleUpdateSchedule = async () => {
    if (!scheduleData) return;

    if (
      scheduleData.name.trim() === "" ||
      scheduleData.address.trim() === ""
    ) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (scheduleData.endAt <= scheduleData.startAt) {
      Alert.alert("Lỗi", "Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    try {
      const updatedSchedule: Schedule = {
        ...scheduleData,
        name: scheduleData.name.trim(),
        address: scheduleData.address.trim(),
        date: new Date(scheduleData.date).getTime(),
        startAt: new Date(scheduleData.startAt).getTime(),
        endAt: new Date(scheduleData.endAt).getTime(),
      };

      await scheduleAPI.updateSchedule(eventId,scheduleId, updatedSchedule);
      Alert.alert("Thành công", "Chỉnh sửa lịch trình thành công.");
      navigation.goBack(); // Quay lại màn hình chi tiết và cập nhật danh sách
    } catch (error) {
      console.error("Error updating schedule:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi chỉnh sửa lịch trình.");
    }
  };

  // Hàm xử lý chọn ngày
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && scheduleData) {
      handleChangeValue("date", selectedDate.getTime());
    }
  };

  // Hàm xử lý chọn thời gian bắt đầu
  const onChangeStartAt = (event: any, selectedDate?: Date) => {
    setShowStartAtPicker(false);
    if (selectedDate && scheduleData) {
      handleChangeValue("startAt", selectedDate.getTime());
    }
  };

  // Hàm xử lý chọn thời gian kết thúc
  const onChangeEndAt = (event: any, selectedDate?: Date) => {
    setShowEndAtPicker(false);
    if (selectedDate && scheduleData) {
      handleChangeValue("endAt", selectedDate.getTime());
    }
  };

  if (!scheduleData) {
    return (
      <ContainerComponent>
        <ActivityIndicator size={20} color={appColors.primary} />
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent>
       <RowComponent justify="flex-start">
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            justifyContent: "center",
            marginLeft: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={28} color={appColors.black} />
        </TouchableOpacity>

        <TextComponent text="Sửa Lịch Trình" title />

      </RowComponent>

      <ScrollView contentContainerStyle={styles.container}>
        <SpaceComponent height={20} />

        <InputComponent
          placeholder="Tên điểm đến"
          value={scheduleData.name}
          onChange={(val) => handleChangeValue("name", val)}
        />
        <SpaceComponent height={10} />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <TextComponent text={`Ngày: ${new Date(scheduleData.date).toLocaleDateString()}`} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date(scheduleData.date)}
            mode="date"
            display="spinner"
            onChange={onChangeDate}
          />
        )}
        <SpaceComponent height={10} />

        <ChoiceLocation onSelect={handleChangePosition} />
        <SpaceComponent height={10} />

        <RowComponent>
          <TouchableOpacity onPress={() => setShowStartAtPicker(true)} style={[styles.input, { flex: 1 }]}>
            <TextComponent text={`Bắt đầu: ${new Date(scheduleData.startAt).toLocaleTimeString()}`} />
          </TouchableOpacity>
          <SpaceComponent width={20} />
          <TouchableOpacity onPress={() => setShowEndAtPicker(true)} style={[styles.input, { flex: 1 }]}>
            <TextComponent text={`Kết thúc: ${new Date(scheduleData.endAt).toLocaleTimeString()}`} />
          </TouchableOpacity>
        </RowComponent>
        {showStartAtPicker && (
          <DateTimePicker
            value={new Date(scheduleData.startAt)}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChangeStartAt}
          />
        )}
        {showEndAtPicker && (
          <DateTimePicker
            value={new Date(scheduleData.endAt)}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChangeEndAt}
          />
        )}
        <SpaceComponent height={10} />

        <InputComponent
          placeholder="Mô tả"
          multiline
          numberOfLines={3}
          value={scheduleData.description}
          onChange={(val) => handleChangeValue("description", val)}
        />
        <SpaceComponent height={20} />

        <ButtonComponent text="Lưu Thay Đổi" onPress={handleUpdateSchedule} type="primary" />
      </ScrollView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
});

export default EditScheduleScreen;
