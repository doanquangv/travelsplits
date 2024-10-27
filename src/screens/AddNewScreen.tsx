import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import ContainerComponent from "../components/ContainerComponent";
import { ButtonComponent, InputComponent, SectionComponent } from "../components";
import TextComponent from "../components/TextComponent";
import { useSelector } from "react-redux";
import { authReducer, authSelector } from "../redux/reducers/authReducer";
import ChoiceLocation from "../components/ChoiceLocation";

const initValues = {
  title: "",
  descreption: "",
  location: {
    title: "",
    address: "",
  },
  imageUral: "",
  users: [""],
  hostId: "",
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector)
  const [eventData, setEventData] = useState<any>({...initValues, hostId: auth.id});


  const handleChangeValue = (key: string, value: any) => {
    const items = { ...eventData };
    items[`${key}`] = value;
    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log(eventData);
  };

  return (
    <ContainerComponent isScoll>
      <SectionComponent>
        <TextComponent text="Thêm Mới" title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Tên chuyến đi"
          value={eventData.title}
          onChange={(val) => handleChangeValue("title", val)}
        />
        <InputComponent
          placeholder="Mô tả"
          multiline
          allowClear
          numberOfLines={3}
          value={eventData.descreption}
          onChange={(val) => handleChangeValue("descreption", val)}
        />
        <ChoiceLocation/>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text="add" onPress={handleAddEvent} type="primary"/>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
