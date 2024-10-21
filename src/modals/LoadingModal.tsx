import {
  View,
  Text,
  Modal,
  ActivityIndicatorBase,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import TextComponent from "../components/TextComponent";
import { appColors } from "../constants/appColors";

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const { visible, mess } = props;
  return (
    <Modal
      visible={visible}
      style={[{ flex: 1 }]}
      transparent
      statusBarTranslucent
    >
      <View
        style={{
            flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={appColors.white} size={32}/>
        <TextComponent text="Loading" flex={0} color={appColors.white} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
