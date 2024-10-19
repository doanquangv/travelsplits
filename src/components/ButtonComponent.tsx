import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import TextComponent from "./TextComponent";
import { globalStyles } from "../styles/globalStyles";
import { appColors } from "../constants/appColors";
import { fontFamily } from "../constants/fontFamilies";
import { TextalignCenter } from "iconsax-react-native";

interface Props {
  icon?: ReactNode;
  text: string;
  type?: "primary" | "text" | "link";
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textSytle?: StyleProp<TextStyle>;
  textFont?: string;
  onPress?: () => void;
  iconFlex?: "right" | "left";
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textSytle,
    textFont,
    onPress,
    iconFlex,
  } = props;
  return type === 'primary' ?(

    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        { backgroundColor: color ?? appColors.primary,marginBottom:17, width:'80%'},
      ]}
    >
      {icon && iconFlex === "left" && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[textSytle, {marginLeft: icon  ? 12 : 0, fontSize:16, textAlign:'center'}, ]}
        
        flex={icon && iconFlex === "right" ? 1 : 0}
        font={textFont ?? fontFamily.regular}
        
        
      />
      {icon && iconFlex === "right" && icon}
    </TouchableOpacity>
    </View>

    
  ):(
    <TouchableOpacity onPress={onPress}> 
        <TextComponent text={text}  flex={0}
        color={type === 'link' ? appColors.primary : appColors.text}
        />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
