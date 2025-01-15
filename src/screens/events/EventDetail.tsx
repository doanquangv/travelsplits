import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft2, Card, MoneyRecive, MoneySend } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from "react-native";
import {
  ButtonComponent,
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent
} from "../../components";
import TextComponent from "../../components/TextComponent";
import { appColors } from "../../constants/appColors";
import { fontFamily } from "../../constants/fontFamilies";
import { eventModel } from "../../models/eventModel";
import { globalStyles } from "../../styles/globalStyles";
import CardComponent from "../../components/CardComponent";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ExpensesTab from "./EventDetail/expenseScreen/DebtTab";
import ScheduleTab from "./EventDetail/ScheduleTab";
import MembersTab from "./EventDetail/MembersTab";
import EventDetailTabs from "../../navigations/event/TabEventNavigation";
import TabEventNavigation from "../../navigations/event/TabEventNavigation";
import { Button } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import eventAPI from "../../apis/eventApi";
import { Feather } from "@expo/vector-icons";



const EventDetail = ({ navigation, route }: any) => {
  const { item } = route.params;
  const imageUrl = item.imageUrl; 
  const modalizeRef = useRef<Modalize>(null);
  

  const openSettings = () => {
    modalizeRef.current?.open();
  }

  const handleEditEvent = () => {
    modalizeRef.current?.close();
    navigation.navigate('EditEventScreen', { event: item });
  }

  const handleDeleteEvent = async () => {
    modalizeRef.current?.close();
    try {   
      await eventAPI.HandleEvent(`/${item._id}`, {}, 'delete');
      alert("Xóa sự kiện thành công.");
      navigation.goBack();
    } catch (error) {
      alert("Lỗi khi xóa sự kiện.");
    }
  }

  

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
       <ImageBackground
        source={imageUrl ? { uri: imageUrl } : require("../../assets/images/travel.png")}
        style={{ height: 244 }}
        imageStyle={{
          resizeMode: "cover",
        }}
      >
        <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]}>
          <View style={{ paddingTop: 42, padding: 15 }}>
            <RowComponent>
              <TouchableOpacity
                style={{ width: 48, height: 48, justifyContent: "center" }}
                onPress={() => navigation.goBack()}
              >
                <ArrowLeft2 size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                numberOfLines={1}
                flex={1}
                text={item.title}
                size={22}
                color={appColors.white}
              />
              <TouchableOpacity onPress={openSettings} style={{width:48,height:48,justifyContent:"center",alignItems:"flex-end"}}>
                <Feather name="settings" size={20} color={appColors.white} />
              </TouchableOpacity>
              
            </RowComponent>
          </View>
        </LinearGradient>
      </ImageBackground>
     
       
      
      
      <TabEventNavigation eventId={item._id}/>
        
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={{padding:20}}>
          <ButtonComponent text="Chỉnh sửa sự kiện" type="primary" onPress={handleEditEvent} />
          <SpaceComponent height={10}/>
          <ButtonComponent text="Xóa sự kiện" type="primary" color={appColors.danger} onPress={handleDeleteEvent} />
        </View>
      </Modalize>

    </View>
  );
};

export default EventDetail;
