import { View, Text, Button, Image, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from "../../components";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sms,Lock } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import ContainerComponent from "../../components/ContainerComponent";
import TextComponent from "../../components/TextComponent";
import { fontFamily } from "../../constants/fontFamilies";
import SocialLogin from "./components/SocialLogin";
import SignUpScreen from "./SignUpScreen";
import authenticationAPI from "../../apis/authApi";
import { Validate } from "../../../utils/validate";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const LoginScreen = ({navigation} : any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true)
  const [isDisable, setIsDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();


  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !password || !emailValidation) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  },[email, password])

  const handleLogin = async () => {

    const emailValidation = Validate.email(email);
    if (emailValidation) {
      setIsLoading(true)
      try{
        const res = await authenticationAPI.HandleAuthentication('/login', {email, password}, 'post');

        dispatch(addAuth(res.data));
       
        await AsyncStorage.setItem('auth', isRemember? JSON.stringify(res.data): email);
        
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }else {
      Alert.alert('Email is not valid')
    }
  }
  return (
    <ContainerComponent isImageBackground isScoll>
      <SectionComponent styles={{justifyContent:'center', alignItems:'center', marginTop:75}}>
        <Image source={require('../../assets/images/logo-removebg-preview.png')} style= {{width:156, height:46, marginBottom:30}}/>
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent width={0} height={21} />
        <InputComponent
        value={email}
        placeholder="Email"
        onChange={(val) => setEmail(val)}
        // isPassword
        allowClear
        type="email-address"
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent
        value={password}
        placeholder="Password"
        onChange={(val) => setPassword(val)}
        isPassword
        allowClear
        type="email-address"
        affix={<Lock size={22} color={appColors.gray} />}
      />

      <RowComponent justify="space-between">
        <RowComponent onPress={()=> setIsRemember(!isRemember)}>
          <Switch trackColor={{true: appColors.primary}}  value={isRemember} onChange={() => setIsRemember(!isRemember)}/>
          <SpaceComponent width={5} height={0} />
          <TextComponent  text="Remenber me"/>

        </RowComponent>
        <ButtonComponent text={"Forgot Password?"}  onPress={() => navigation.navigate('ForgotPassword')} type="text"/>
        
      </RowComponent>

      </SectionComponent>

      <SpaceComponent height={16} width={0} />

      <SectionComponent >
        <ButtonComponent disable={isLoading||isDisable} onPress={handleLogin} text={"Sign in"} type="primary" />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?"/>
          <ButtonComponent type="link" text="Sign up" onPress={() => navigation.navigate(SignUpScreen)}/>
        </RowComponent>
      </SectionComponent>

       
    </ContainerComponent>
       
    
  );
};

export default LoginScreen;
