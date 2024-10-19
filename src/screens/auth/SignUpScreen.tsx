import { View, Text, Button, Image, Switch } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from "../../components";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sms,Lock, User } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import ContainerComponent from "../../components/ContainerComponent";
import TextComponent from "../../components/TextComponent";
import { fontFamily } from "../../constants/fontFamilies";
import SocialLogin from "./components/SocialLogin";
import LoginScreen from "./LoginScreen";

const initValue = {
  email: '',
  password: '',
  username: '',
  confirmPassword: ''
}

const SignUpScreen = ({navigation}:any) => {
  const [values, setValues] = useState(initValue)

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  }
  return (
    <ContainerComponent isImageBackground isScoll  back>
      

      <SectionComponent>
        <TextComponent size={24} title text="Sign up" />
        <SpaceComponent width={0} height={21} />
        <InputComponent
          value={values.username}
          placeholder="Username"
          onChange={(val) => handleChangeValue('username',val)}
          // isPassword
          allowClear
          
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.email}
          placeholder="email"
          onChange={(val) => handleChangeValue('email',val)}
          // isPassword
          allowClear
         
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.password}
          placeholder="Password"
          onChange={(val) => handleChangeValue('password',val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm Password"
          onChange={(val) => handleChangeValue('confirmpassword',val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />

      </SectionComponent>

      <SpaceComponent height={16} width={0} />

      <SectionComponent  >
        <ButtonComponent  text={"SIGN UP"} type="primary" onPress={() => {}}/>
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account"/>
          <ButtonComponent  type="link" text="Sign in" onPress={() => navigation.navigate('LoginScreen')}/>
        </RowComponent>
      </SectionComponent>

       
    </ContainerComponent>
       
    
  );
};

export default SignUpScreen;
