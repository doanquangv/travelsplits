import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import ListComponent from "./ListComponent";
import TextComponent from "./TextComponent";
import { AppInfo } from "../constants/AppInfor";
import { eventModel } from "../models/eventModel";
import AvataGroup from "./AvataGroup";
import RowComponent from "./RowComponent";
import { ArrowCircleDown, ArrowDown, Location } from "iconsax-react-native";
import { appColors } from "../constants/appColors";
import SpaceComponent from "./SpaceComponent";
import ContainerComponent from "./ContainerComponent";
import SectionComponent from "./SectionComponent";
import { useNavigation } from "@react-navigation/native";
import EventStatus from "./StatusEvent";

// const getEventStatus = (startAt: number, endAt: number) => {
//   const now = Date.now();
//   if (now < startAt) {
//     return "Sắp bắt đầu";
//   } else if (now >= startAt && now <= endAt) {
//     return "Đang diễn ra";
//   } else {
//     return "Đã kết thúc";
//   }
// };
interface Props {
  item: eventModel;
  type: "card" | "list";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Sắp bắt đầu":
      return appColors.primary; // Màu cho trạng thái "Sắp bắt đầu"
    case "Đang diễn ra":
      return "green"; // Màu cho trạng thái "Đang diễn ra"
    case "Đã kết thúc":
      return "red"; // Màu cho trạng thái "Đã kết thúc"
    default:
      return appColors.gray; // Màu mặc định
  }
};
const EventItem = (props: Props) => {
  const { item, type } = props;
  // const status = getEventStatus(item.startAt, item.endAt);
  
  const formattedStartDate = new Date(item.startDate).toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const formattedEndDate = new Date(item.endDate).toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const navigation: any = useNavigation();
  return (
    <ListComponent
      isShadow
      styles={{ width: AppInfo.sizes.WIDTH * 0.87 }}
      onPress={() => navigation.navigate("EventDetail", { item })}
    >
      <RowComponent>
        <ImageBackground
          style={{ height: 60, width: 60, padding: 10 }}
          source={{ uri: item.imageUrl || "../assets/images/travel.png" }}
          imageStyle={{ resizeMode: "cover", borderRadius: 12 }}
        />

        {/* <SpaceComponent width={50}/> */}
        <SectionComponent styles={{ flex: 1 }}>
          <TextComponent numberOfLines={1} text={item.title} title size={18} />
          {/* <AvataGroup /> */}
        <RowComponent>
            <Location size={12} color={appColors.primary} variant="TwoTone" />
            <SpaceComponent width={5} />
            <TextComponent
              flex={1}
              text={item.locationAddress}
              color={appColors.primary}
              size={12}
              numberOfLines={1}
            />
          </RowComponent>
            
          <TextComponent flex={1} text={formattedStartDate}/>
          <ArrowDown size={12} color={appColors.primary}  />
          <TextComponent flex={1} text={formattedEndDate}/>
         
        </SectionComponent>
        <SectionComponent>
          <TextComponent text="Trạng thái :" />
          <TextComponent text={ item.status} size={14} color={getStatusColor(item.status)} />
          
        </SectionComponent>
      </RowComponent>
    </ListComponent>
  );
};

export default EventItem;
