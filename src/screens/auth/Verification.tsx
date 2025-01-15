import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../components";
import TextComponent from "../../components/TextComponent";
import { appColors } from "../../constants/appColors";
import { fontFamily } from "../../constants/fontFamilies";
import authenticationAPI from "../../apis/authApi";
import { LoadingModal } from "../../modals";
import { addAuth } from "../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const Verification = ({ navigation, route }: any) => {
  const { code, email, password, username } = route.params;
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit((limit) => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;
    codeValues.forEach((val) => (item += val));
    
    
    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    const api = `/verification`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        { email },
        "post"
      );

      setLimit(120);
      setCurrentCode(res.data.code);
      setIsLoading(false);
    } catch (error) {
      console.log(`Can not send code to ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessages("code không đúng ");
      } else {
        setErrorMessages('')

        const api = `/register`;
        const data = {
          email,
          password,
          username: username??'',
        }

        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            "post"
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessages("Không thể đăng ký bằng tài khoản này");
          console.log(`Can not register user ${error}`);
          
        }
      }
    } else {
      setErrorMessages("Hãy đợi đến code tiếp theotheo");
    }
  };

  return (
    <ContainerComponent back isImageBackground isScoll>
      <SectionComponent>
        <TextComponent text="Xác thực người dùng" title />
        <SpaceComponent height={12} />
        <TextComponent
          text={`Đã gửi một đoạn mã xác thực vào ${email}`}
        />

        <SpaceComponent height={26} width={0} />

        <RowComponent justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 0);
              val.length > 0 && ref2.current.focus();
            }}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            value={codeValues[1]}
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
            style={[styles.input]}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            value={codeValues[2]}
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            style={[styles.input]}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 3);
              
            }}
            style={[styles.input]}
            placeholder="-"
          />
        </RowComponent>
      </SectionComponent>
      {errorMessages && (
        <TextComponent
          flex={0}
          styles={{ textAlign: "center" }}
          text={errorMessages}
          color={appColors.danger}
        />
      )}
      <SectionComponent styles={{ marginTop: 40 }}>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Tiếp tục"
          type="primary"
        />
      </SectionComponent>

      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Gửi lại trong " flex={0} />
            <TextComponent
              text={`${(limit - (limit %60)) /60}:${limit - (limit - (limit %60))}`}
              flex={0}
              color={appColors.primary}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text={"Gửi lại mã xác thực"}
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
});
