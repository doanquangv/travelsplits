import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardType, StyleProp, ViewStyle } from "react-native";
import React, { ReactNode, useState } from "react";
import { appColors } from "../constants/appColors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { EyeSlash } from "iconsax-react-native";
import { globalStyles } from "../styles/globalStyles";


interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  styles?: StyleProp<ViewStyle>
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd,
    multiline,
    numberOfLines,
    styles
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[globalStyles.inputContainer, {
      alignItems: multiline ? 'flex-start' : 'center',
    }, styles]}>
      {affix ?? affix}
      <TextInput
        style={[globalStyles.input, globalStyles.text, {paddingHorizontal: affix || suffix ? 12 : 0}]}
        value={value}
        placeholder={placeholder ?? ""}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={appColors.gray}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {suffix ?? suffix}

      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }
      >
        {isPassword ? (
          <FontAwesome name={isShowPass ? 'eye-slash': 'eye'} size={22} color={appColors.gray} />
        ) : (
          value &&  value.length > 0 && allowClear && (
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

