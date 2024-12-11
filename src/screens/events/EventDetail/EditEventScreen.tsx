import React, { useEffect, useState } from "react";
import { View } from "react-native";
import eventAPI from "../../../apis/eventApi";
import ContainerComponent from "../../../components/ContainerComponent";
import { ButtonComponent, InputComponent, SectionComponent, SpaceComponent, TimePicker } from "../../../components";
import TextComponent from "../../../components/TextComponent";
import { fontFamily } from "../../../constants/fontFamilies";
import ChoiceLocation from "../../../components/ChoiceLocation";


const EditEventScreen = ({ navigation, route }: any) => {
  const { event } = route.params;
  const [eventData, setEventData] = useState({...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  });

  const handleChangeValue = (key:string, value:any) => {
    const items = {...eventData};
    items[key] = value;
    setEventData(items);
  }

  const handleLocation = (val:any) => {
    const items = { ...eventData };
    items.position = val.position;
    items.locationAddress = val.address;
    setEventData(items);
  }

  const handleSave = async () => {
    const payload = {
      title: eventData.title,
      description: eventData.description,
      locationAddress: eventData.locationAddress,
      position: eventData.position,
      imageUrl: eventData.imageUrl,
      startDate: eventData.startDate.getTime(),
      endDate: eventData.endDate.getTime(),
    }
    try {
      const res = await eventAPI.HandleEvent(`/${event._id}`, payload, 'put');
      if (res && res.data) {
        alert("Cập nhật sự kiện thành công");
        navigation.reset({
          index: 0,
          routes: [
            { name: "main", params: { screen: "Home" } }, // Điều hướng đến TabNavigation và chọn tab "Home"
          ],
        });      }
    } catch (error) {
      console.log("Error updating event:", error);
      alert("Lỗi khi cập nhật sự kiện");
    }
  }

  return (
    <ContainerComponent isScoll>
      <SectionComponent>
        <TextComponent text="Chỉnh Sửa Sự Kiện" title font={fontFamily.bold}/>
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Tên chuyến đi"
          value={eventData.title}
          onChange={(text) => handleChangeValue("title", text)}
        />
        <InputComponent
          placeholder="Mô tả"
          value={eventData.description || ""}
          onChange={(text) => handleChangeValue("description", text)}
        />
        <TimePicker
          label="Ngày bắt đầu"
          type="date"
          onSelect={(val) => handleChangeValue("startDate", val)}
          selected={eventData.startDate}
        />
        <SpaceComponent height={10}/>
        <TimePicker
          label="Ngày kết thúc"
          type="date"
          onSelect={(val) => handleChangeValue("endDate", val)}
          selected={eventData.endDate}
        />
        <ChoiceLocation onSelect={handleLocation} />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text="Lưu" type="primary" onPress={handleSave} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default EditEventScreen;
