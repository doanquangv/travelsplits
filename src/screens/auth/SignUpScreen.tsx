import { View, Text, Button, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
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
import { LoadingModal } from "../../modals";
import authenticationAPI from "../../apis/authApi";
import { Validate } from "../../../utils/validate";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpScreen = ({navigation}:any) => {
  const [values, setValues] = useState(initValue)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if(values.email || values.password){
      setErrorMessage('')
    }
  },[values.email, values.password] )

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {


    const {username, email, password, confirmPassword} = values;

    const emailValidate = Validate.email(email)
    const passwordValidate = Validate.Password(password)

    if(email && password && confirmPassword){
      if(emailValidate && passwordValidate){
        setErrorMessage('')
        setIsLoading(true)
      try {
        const res = await authenticationAPI.HandleAuthentication('/register', {fullname: values.username, email,password},'post')
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data))
        setIsLoading(false)
      
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      
      }
      } else {
        setErrorMessage('Email is valid')
      }

    
    
  }else {
    setErrorMessage('Please fill all fields')
  }}


  return (
    <>
    
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
            onChange={(val) => handleChangeValue('confirmPassword',val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />

        </SectionComponent>
         
        
          {
            errorMessage && (<SectionComponent><TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>)}
        

        
        <SpaceComponent height={16} width={0} />

        <SectionComponent  >
          <ButtonComponent onPress={handleRegister} text={"SIGN UP"} type="primary" />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don't have an account"/>
            <ButtonComponent  type="link" text="Sign in" onPress={() => navigation.navigate('LoginScreen')}/>
          </RowComponent>
        </SectionComponent>
        
      </ContainerComponent>
      <LoadingModal visible={isLoading}  />
    </>
       
    
  );
};

export default SignUpScreen;
