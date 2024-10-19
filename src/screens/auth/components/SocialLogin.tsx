import { View, Text, Button, Image } from "react-native";
import React from "react";
import { ButtonComponent, SectionComponent, SpaceComponent } from "../../../components";
import TextComponent from "../../../components/TextComponent";
import { appColors } from "../../../constants/appColors";
import { fontFamily } from "../../../constants/fontFamilies";

const Google = require("../../../assets/images/google.png");
const Facebook = require("../../../assets/images/facebook.png");
const SocialLogin = () => {
  return (
    <SectionComponent >
      <TextComponent
        styles={{ textAlign: "center" }}
        text="OR"
        color={appColors.gray}
        size={16}
        font={fontFamily.medium}
      />
      <SpaceComponent width={0} height={17}/>
      <ButtonComponent
        text="Sign in with Google"
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamily.regular}
        icon={<Image source={Google} />}
        iconFlex="left"
      />

      <ButtonComponent
        text="Sign in with Facebook"
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        textFont={fontFamily.regular}
        icon={<Image source={Facebook} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialLogin;
