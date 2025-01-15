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


interface Props {
  item: eventModel;
  type: "card" | "list";
}


const EventItem = (props: Props) => {
  const { item, type } = props;
  
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
          <TextComponent text={ item.status} size={14}  />
          
        </SectionComponent>
      </RowComponent>
    </ListComponent>
  );
};

export default EventItem;
