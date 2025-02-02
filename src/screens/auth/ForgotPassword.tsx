import { View, Text, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import {
  ButtonComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from "../../components";
import TextComponent from "../../components/TextComponent";
import { ArrowRight, Sms } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import { Validate } from "../../../utils/validate";
import { LoadingModal } from "../../modals";
import authenticationAPI from "../../apis/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    const api = `/forgotpassword`
    setIsLoading(true)
    try {

      const res: any = await authenticationAPI.HandleAuthentication(api, {email}, 'post')

      Alert.alert('Thành công', 'Kiểm tra email của bạn để đặt lại mật khẩu')

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(`can not send email to reset password: ${error}`);
      
    }
  }

  return (
    <ContainerComponent back isImageBackground isScoll>
      <SectionComponent>
        <TextComponent text="Đặt lại mật khẩu" title />
        <TextComponent text="Vui lòng nhâp email của bạn để đặt lại mật khẩu" />

        <SpaceComponent height={26} width={0} />
        <InputComponent
          value={email}
          onChange={(val) => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder="abc@gmail.com"
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          onPress={handleForgotPassword}
          disable={isDisable}
          text="Gửi"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponent>
      <LoadingModal visible={isLoading}/>
    </ContainerComponent>
  );
};

export default ForgotPassword;
