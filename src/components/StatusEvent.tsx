import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

interface Props {
  status: string;
}

const EventStatus = ({ status }: Props) => {
  let statusColor;
  switch (status) {
    case "Sắp bắt đầu":
      statusColor = appColors.primary; // Ví dụ: màu cam cho sắp bắt đầu
      break;
    case "Đang diễn ra":
      statusColor = appColors.green; // Ví dụ: màu xanh lá cho đang diễn ra
      break;
    case "Đã kết thúc":
      statusColor = appColors.gray; // Ví dụ: màu xám cho đã kết thúc
      break;
    default:
      statusColor = appColors.gray;
  }

  return (
    <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  statusText: {
    color: appColors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default EventStatus;
