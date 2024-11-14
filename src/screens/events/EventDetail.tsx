import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft2, Card, MoneyRecive, MoneySend } from "iconsax-react-native";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import {
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

const EventDetail = ({ navigation, route }: any) => {
  const {item}: {item: eventModel} = route.params;
  const [tabSelected, setTabSelected] = useState("expenses");
  const tabs = [
    {
      key: "expenses",
      content: "Chi Phí",
    },
    // {
    //   key: "feeds",
    //   content: "Bảng tin",
    // },
    {
      key: "schedule",
      content: "Lịch trình",
    },
    {
      key: "members",
      content: "Thành viên",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/travel.png")}
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
            </RowComponent>
          </View>
        </LinearGradient>
      </ImageBackground>
     
        <RowComponent styles={{backgroundColor:appColors.white}}>
          {tabs.map((item) => (
            <TouchableOpacity
              onPress={() => setTabSelected(item.key)}
              style={[
                globalStyles.center,
                {
                  flex: 1,
                  borderBottomWidth: 3,
                  borderBottomColor:
                    item.key === tabSelected
                      ? appColors.primary
                      : appColors.white,
                    paddingVertical: 25,
                },
              ]}
              key={item.key}
            >
              <TextComponent
                
                text={item.content}
                font={
                  item.key === tabSelected
                    ? fontFamily.medium
                    : fontFamily.regular
                }
                size={16}
                color={
                  item.key === tabSelected ? appColors.primary : appColors.text
                }
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
      <ScrollView showsVerticalScrollIndicator={false}  style={{flex :1, padding:20}}>
        <SectionComponent  styles={[globalStyles.shadow,{backgroundColor:appColors.white, borderRadius:25}]}>
          <View style={[globalStyles.center,{paddingTop:10}]}>
            <TextComponent text="Số dư nợ: " size={18} />
            <TextComponent text="0đ" font={fontFamily.bold} size={24} />

          </View>
          <SpaceComponent height={20} />
          <RowComponent justify="space-around">

            <RowComponent>
            <CardComponent styles={[globalStyles.noSpaceCard]} color="#f8a9a9">

              <MoneySend   color={appColors.danger} />
            </CardComponent>
              <View style={{paddingLeft:10}}>
              <TextComponent   text="Đã trả: " />
              <TextComponent text="0đ" font={fontFamily.bold} />
              </View>
            
            </RowComponent>
            <View style={{width:1, backgroundColor:appColors.gray,marginHorizontal:10, height:45}}></View>
            
            <RowComponent>
              <CardComponent styles={[globalStyles.noSpaceCard]} color="#bae0bd">
                <MoneyRecive size={20} color={appColors.green} />
              </CardComponent>
              <View style={{paddingLeft:10}}>
              <TextComponent text="Tổng tiền:" />
              <TextComponent text="0đ" font={fontFamily.bold} />
              </View>
            </RowComponent>
          </RowComponent>
        </SectionComponent>

        <SpaceComponent height={30} />

        <SectionComponent styles={[globalStyles.shadow,{backgroundColor:appColors.white, borderRadius:25}]}>
          <TextComponent  text="Số dư nợ khác" size={18} font={fontFamily.bold} styles={{paddingTop:10}} />
          <View  style={[{borderBottomWidth: 1, borderBottomColor:appColors.border, paddingTop:15}]}></View>
        <View>
          <RowComponent justify="space-between" styles={[{paddingVertical:15}]} >
            <RowComponent>
              <CircleComponent>
                <View></View>
              </CircleComponent>
              <TextComponent text="Đoàn Quang vũ" size={16} font={fontFamily.medium} styles={{paddingLeft:5}} />
            </RowComponent>
            <TextComponent text="0đ" size={16} font={fontFamily.medium} color={appColors.black} />
            
          </RowComponent>
          <RowComponent justify="space-between" styles={[{paddingVertical:15}]} >
            <RowComponent>
              <CircleComponent>
                <View></View>
              </CircleComponent>
              <TextComponent text="Đoàn Quang B" size={16} font={fontFamily.medium} styles={{paddingLeft:5}} />
            </RowComponent>
            <TextComponent text="0đ" size={16} font={fontFamily.medium} color={appColors.black} />
            
          </RowComponent>
          <RowComponent justify="space-between" styles={[{paddingVertical:15}]} >
            <RowComponent>
              <CircleComponent>
                <View></View>
              </CircleComponent>
              <TextComponent text="Đoàn Quang C" size={16} font={fontFamily.medium} styles={{paddingLeft:5}} />
            </RowComponent>
            <TextComponent text="0đ" size={16} font={fontFamily.medium} color={appColors.black} />
            
          </RowComponent>

        </View> 
          
        </SectionComponent>

        
      </ScrollView>
    </View>
  );
};

export default EventDetail;
