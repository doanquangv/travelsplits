import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigations/types";
import scheduleAPI from "../../../../apis/scheduleApi";
import ContainerComponent from "../../../../components/ContainerComponent";
import TextComponent from "../../../../components/TextComponent";
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
} from "../../../../components";
import ChoiceLocation from "../../../../components/ChoiceLocation";
import { appColors } from "../../../../constants/appColors";
import { ArrowLeft } from "iconsax-react-native";

type AddScheduleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddScheduleScreen"
>;

type AddScheduleScreenRouteProp = RouteProp<
  RootStackParamList,
  "AddScheduleScreen"
>;

type Props = {
  navigation: AddScheduleScreenNavigationProp;
  route: AddScheduleScreenRouteProp;
};

interface Schedule {
  eventId: string;
  name: string;
  description: string;
  startAt: number;
  endAt: number;
  date: number;
  address: string;
  position: {
    lat: number;
    long: number;
  };
}

const initValues: Omit<Schedule, "eventId"> = {
  name: "",
  description: "",
  address: "",
  position: {
    lat: 0,
    long: 0,
  },
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId } = route.params;
  const [scheduleData, setScheduleData] = useState<Schedule>({
    eventId,
    ...initValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartAtPicker, setShowStartAtPicker] = useState(false);
  const [showEndAtPicker, setShowEndAtPicker] = useState(false);

  // Hàm cập nhật giá trị cho các trường dữ liệu
  const handleChangeValue = (key: keyof Schedule, value: any) => {
    setScheduleData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangePosition = (val: any) => {
    setScheduleData((prev) => ({
      ...prev,
      position: {
        lat: val.position.lat,
        long: val.position.long,
      },
      address: val.address,
    }));
  };

  // Hàm xử lý lưu lịch trình
  const handleAddSchedule = async () => {
    if (scheduleData.name.trim() === "" || scheduleData.address.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (scheduleData.endAt <= scheduleData.startAt) {
      Alert.alert("Lỗi", "Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    try {
      const newSchedule: Schedule = {
        ...scheduleData,
        name: scheduleData.name.trim(),
        address: scheduleData.address.trim(),
        date: new Date(scheduleData.date).getTime(),
        startAt: new Date(scheduleData.startAt).getTime(),
        endAt: new Date(scheduleData.endAt).getTime(),
      };

      await scheduleAPI.addSchedule(eventId, newSchedule);
      Alert.alert("Thành công", "Thêm lịch trình mới thành công.");
      navigation.goBack(); // Quay lại màn hình trước đó và cập nhật danh sách
    } catch (error) {
      console.error("Error adding schedule:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm lịch trình.");
    }
  };

  // Hàm xử lý chọn ngày
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChangeValue("date", selectedDate.getTime());
    }
  };

  // Hàm xử lý chọn thời gian bắt đầu
  const onChangeStartAt = (event: any, selectedDate?: Date) => {
    setShowStartAtPicker(false);
    if (selectedDate) {
      handleChangeValue("startAt", selectedDate.getTime());
    }
  };

  // Hàm xử lý chọn thời gian kết thúc
  const onChangeEndAt = (event: any, selectedDate?: Date) => {
    setShowEndAtPicker(false);
    if (selectedDate) {
      handleChangeValue("endAt", selectedDate.getTime());
    }
  };

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

        <TextComponent text="Thêm Lịch Trình Mới" title />

      </RowComponent>
      <ScrollView contentContainerStyle={styles.container}>
        <SpaceComponent height={20} />

        <InputComponent
          placeholder="Tên điểm đến"
          value={scheduleData.name}
          onChange={(val) => handleChangeValue("name", val)}
        />
        <SpaceComponent height={10} />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <TextComponent
            text={`Ngày: ${new Date(scheduleData.date).toLocaleDateString()}`}
          />
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
          <TouchableOpacity
            onPress={() => setShowStartAtPicker(true)}
            style={[styles.input, { flex: 1 }]}
          >
            <TextComponent
              text={`Bắt đầu: ${new Date(
                scheduleData.startAt
              ).toLocaleTimeString()}`}
            />
          </TouchableOpacity>
          <SpaceComponent width={20} />
          <TouchableOpacity
            onPress={() => setShowEndAtPicker(true)}
            style={[styles.input, { flex: 1 }]}
          >
            <TextComponent
              text={`Kết thúc: ${new Date(
                scheduleData.endAt
              ).toLocaleTimeString()}`}
            />
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

        <ButtonComponent
          text="Thêm Lịch Trình"
          onPress={handleAddSchedule}
          type="primary"
        />
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
    justifyContent: "center",
  },
});

export default AddScheduleScreen;
