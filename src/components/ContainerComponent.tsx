import { View, Text, ImageBackground, ScrollView, Button } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import RowComponent from "./RowComponent";
import ButtonComponent from "./ButtonComponent";
import { ArrowLeft } from "iconsax-react-native";
import { appColors } from "../constants/appColors";
import { TouchableOpacity } from "react-native";
import TextComponent from "./TextComponent";
import { fontFamily } from "../constants/fontFamilies";

interface Props {
  isImageBackground?: boolean;
  isScoll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}

const ContainerComponent = (props: Props) => {
  const { isImageBackground, isScoll, title, children, back } = props;
  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        {(title ||
          back) && (
            <RowComponent
              styles={{ paddingHorizontal: 16, paddingVertical: 10, minWidth: 48, minHeight:48, justifyContent: "flex-start" }}
            >
              {back && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                  <ArrowLeft size={28} color={appColors.text} />
                </TouchableOpacity>
              )}
              { title &&  <TextComponent text={title} font={fontFamily.medium} size={15} flex={1} />}
            </RowComponent>
          )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScoll ? (
    <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require("../assets/images/splash-image.png")}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
