import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import Swiper from "react-native-swiper"; // or the correct path to Swiper
import { AppInfo } from "../../constants/AppInfor";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/TextComponent";
import { fontFamily } from "../../constants/fontFamilies";

const OnbroadingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        loop={false}
        onIndexChanged={(num) => setIndex(num)}
        activeDotColor={appColors.white}
        index={index}
      >
        <Image
          source={require("../../assets/images/Onboarding-1.png")}
          style={{
            flex: 1,
            width: AppInfo.sizes.WIDTH,
            height: AppInfo.sizes.HEIGHT,
          }}
        />

        <Image
          source={require("../../assets/images/Onboarding-2.png")}
          style={{
            flex: 1,
            width: AppInfo.sizes.WIDTH,
            height: AppInfo.sizes.HEIGHT,
          }}
        />

        <Image
          source={require("../../assets/images/Onboarding-3.png")}
          style={{
            flex: 1,
            width: AppInfo.sizes.WIDTH,
            height: AppInfo.sizes.HEIGHT,
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 40,
            paddingVertical: 60,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <TextComponent text="Bỏ qua" color={appColors.gray} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate("LoginScreen")
          }
        >
          <TextComponent text="Tiếp tục" color={appColors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnbroadingScreen;
