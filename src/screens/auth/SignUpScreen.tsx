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

interface errorMessages  {
  email: string,
  password: string,
  confirmPassword: string
}

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpScreen = ({navigation}:any) => {
  const [values, setValues] = useState(initValue)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<any>()
  const [isDisable, setIsDisable] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if(!errorMessage || (errorMessage.email || errorMessage.password || errorMessage.confirmPassword)|| (!values.email || !values.password || !values.confirmPassword)){
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  },[errorMessage, values])

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const formValidator = (key: string) => {
    const data= {...errorMessage}
    let message = ``
    switch (key) {
      case 'email':
        if (!values.email) {
          message= `Email is required`
        } else if(!Validate.email(values.email)){
          message = `Email is not valid`
        } else {
          message = ''
        }

      break;

      case 'password':
        message = !values.password ? `Password is required` : '';
        break;

      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = `Confirm Password is required`
        }else if(values.password !== values.confirmPassword){
          message = `Password does not match`
        } else {
          message = ''
        }
        break;
    }
    

    data[`${key}`] = message;
    setErrorMessage(data)
  }

  const handleRegister = async () => {
    const api = `/verification`
    setIsLoading(true)
    try {
      const res = await authenticationAPI.HandleAuthentication(api, {email: values.email},'post')
      
      setIsLoading(false)

      navigation.navigate('Verification', {code: res.data.code, ...values})
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
}


  return (
    <>
    
      <ContainerComponent isImageBackground isScoll  back>
        

        <SectionComponent>
          <TextComponent size={24} title text="Đăng ký" />
          <SpaceComponent width={0} height={21} />
          <InputComponent
            value={values.username}
            placeholder="Tên Người dùng"
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
            onEnd={() => formValidator('email')}
          />
          <InputComponent
            value={values.password}
            placeholder="Mật khẩu"
            onChange={(val) => handleChangeValue('password',val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password')}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Nhập lại mật khẩu"
            onChange={(val) => handleChangeValue('confirmPassword',val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('confirmPassword')}
          />

        </SectionComponent>
         
          { errorMessage && (errorMessage.mail || errorMessage.password || errorMessage.confirmPassword) && 
          (<SectionComponent>
            {
              Object.keys(errorMessage).map((error, index) => errorMessage[`${error}`] && (<TextComponent text={errorMessage[`${error}`]} key={`error${index}`} color={appColors.danger} /> ))
            }
              
          </SectionComponent>)}
        

        
        <SpaceComponent height={16} width={0} />

        <SectionComponent  >
          <ButtonComponent  onPress={handleRegister} text={"Đăng Ký"} type="primary" disable={isDisable} />
        </SectionComponent>
        {/* <SocialLogin /> */}
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Bạn đã có tài khoản? "/>
            <ButtonComponent  type="link" text="Đăng nhập" onPress={() => navigation.navigate('LoginScreen')}/>
          </RowComponent>
        </SectionComponent>
        
      </ContainerComponent>
      <LoadingModal visible={isLoading}  />
    </>
       
    
  );
};

export default SignUpScreen;
