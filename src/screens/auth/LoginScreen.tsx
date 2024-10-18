import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonComponent, InputComponent } from "../../components";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sms,Lock } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center", padding:20, },
      ]}
    >
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
    </View>
  );
};

export default LoginScreen;
