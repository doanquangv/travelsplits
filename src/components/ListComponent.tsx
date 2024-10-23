import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import { globalStyles } from "../styles/globalStyles";
import { appColors } from "../constants/appColors";

interface Props {
  onPress: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const ListComponent = (props: Props) => {
  const { onPress, children, styles, isShadow, color } = props;

  const localStyles: StyleProp<ViewStyle>[] = [
    isShadow ? globalStyles.shadow : undefined,
    globalStyles.list,
    {backgroundColor: color ?? appColors.white},
    styles,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={localStyles}>
      {children}
    </TouchableOpacity>
  );
};

export default ListComponent;
