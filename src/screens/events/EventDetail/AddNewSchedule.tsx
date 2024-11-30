// client/travelsplits/src/screens/events/EventDetail/AddNewSchedule.tsx

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ContainerComponent from "../../../components/ContainerComponent";
import TextComponent from "../../../components/TextComponent";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from "../../../components";
import { appColors } from "../../../constants/appColors";
import scheduleAPI from "../../../apis/scheduleApi";
import ChoiceLocation from "../../../components/ChoiceLocation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigations/types';

interface Schedule {
  eventId: string;
  name: string;
  description: string;
  startAt: number;
  endAt: number;
  date: number;
  locatinAddress: string;
  position: {
    lat: number;
    lng: number;
  };
}

const initValues: Omit<Schedule, 'eventId'> = {
  name: "",
  description: "",
  locatinAddress: "",
  position: {
    lat: 0,
    lng: 0,
  },
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

type AddNewScheduleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNewSchedule'
>;

type AddNewScheduleScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddNewSchedule'
>;

type Props = {
  navigation: AddNewScheduleScreenNavigationProp;
  route: AddNewScheduleScreenRouteProp;
};

const AddNewScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { eventId } = route.params;

  const [scheduleData, setScheduleData] = useState<Schedule>({
    eventId,
    ...initValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartAtPicker, setShowStartAtPicker] = useState(false);
  const [showEndAtPicker, setShowEndAtPicker] = useState(false);

  // Update value for fields
  const handleChangeValue = (key: keyof Schedule, value: any) => {
    setScheduleData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangePosition = (val: any) => {
    setScheduleData(prev => ({
      ...prev,
      position: {
        lat: val.position.lat,
        lng: val.position.lng,
      },
      address: val.address,
    }));
  };

  // Handle saving schedule
  const handleAddSchedule = async () => {

    if (scheduleData.endAt <= scheduleData.startAt) {
      Alert.alert("Lỗi", "Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    try {
      const newSchedule: Schedule = {
        ...scheduleData,
        name: scheduleData.name.trim(),
        locatinAddress: scheduleData.locatinAddress.trim(),
        date: new Date(scheduleData.date).getTime(),
        startAt: new Date(scheduleData.startAt).getTime(),
        endAt: new Date(scheduleData.endAt).getTime(),
      };

      await scheduleAPI.addSchedule(eventId, newSchedule);
      Alert.alert("Thành công", "Thêm lịch trình mới thành công.");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding schedule:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm lịch trình.");
    }
  };

  // Handle selecting date
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChangeValue("date", selectedDate.getTime());
    }
  };

  // Handle selecting start time
  const onChangeStartAt = (event: any, selectedDate?: Date) => {
    setShowStartAtPicker(false);
    if (selectedDate) {
      handleChangeValue("startAt", selectedDate.getTime());
    }
  };

  // Handle selecting end time
  const onChangeEndAt = (event: any, selectedDate?: Date) => {
    setShowEndAtPicker(false);
    if (selectedDate) {
      handleChangeValue("endAt", selectedDate.getTime());
    }
  };

  return (
    <ContainerComponent>
      <SectionComponent>
        <TextComponent text="Thêm Lịch Trình Mới" title />
      </SectionComponent>
      <SpaceComponent height={20} />

      {/* Name of the destination */}
      <InputComponent
        placeholder="Tên điểm đến"
        value={scheduleData.name}
        onChange={(val) => handleChangeValue("name", val)}
      />
      <SpaceComponent height={10} />

      {/* Event Date */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <TextComponent text={`Ngày: ${new Date(scheduleData.date).toLocaleDateString()}`} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(scheduleData.date)}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <SpaceComponent height={10} />

      {/* Choose Location */}
      <ChoiceLocation onSelect={handleChangePosition} />
      <SpaceComponent height={10} />

      {/* Start and End Time */}
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
          display="default"
          onChange={onChangeStartAt}
        />
      )}
      {showEndAtPicker && (
        <DateTimePicker
          value={new Date(scheduleData.endAt)}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeEndAt}
        />
      )}
      <SpaceComponent height={10} />

      {/* Description */}
      <InputComponent
        placeholder="Mô tả"
        multiline
        numberOfLines={3}
        value={scheduleData.description}
        onChange={(val) => handleChangeValue("description", val)}
      />
      <SpaceComponent height={20} />

      {/* Save Button */}
      <SectionComponent>
        <ButtonComponent
          disable={false}
          text="Thêm Lịch Trình"
          onPress={handleAddSchedule}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
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

export default AddNewScheduleScreen;
