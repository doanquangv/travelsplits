import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { ArrowDown, ArrowDown2, Calendar, Clock } from "iconsax-react-native";
import { appColors } from "../constants/appColors";
import { globalStyles } from "../styles/globalStyles";
import { fontFamily } from "../constants/fontFamilies";
import { DateTime } from "../../utils/DateTime";

interface Props {
  selected?: Date;
  type: "date" | "time";
  onSelect: (val: Date) => void;
  label?: string;
}

const TimePicker = (props: Props) => {
  const { selected, type, onSelect, label } = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    // Cập nhật state date khi selected thay đổi
    if (selected instanceof Date) {
      setDate(selected);
    }
  }, [selected]);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setIsShowDatePicker(false); // Chỉ ẩn trên iOS
    setDate(currentDate);
    onSelect(currentDate);
  };

  return (
    <View style={{flex: 1}}>
      {label && <TextComponent text={label} styles={{ marginTop: 5 }} />}
      <RowComponent
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}
      >
        <TextComponent
          text={` ${selected ?( type ==='time' ?  DateTime.GetTime(selected): DateTime.GetDate(selected)) : "Choice"}`}
          flex={1}
          font={fontFamily.bold}
          styles={{ textAlign: "center" }}
        />
        {
          type ==='time' ? <Clock size={22} color={appColors.gray} /> : <Calendar size={22} color={appColors.primary} />
        }
        
      </RowComponent >
      {isShowDatePicker  && (
        <DateTimePicker
          mode={type}
          value={date}
          is24Hour={true}
          display="spinner" // Hoặc 'default', 'calendar'
          style={{backgroundColor:appColors.white, borderRadius: 10}}
          onChange={onChange}
        />
        
      )}
    </View>
  );
};

export default TimePicker;
