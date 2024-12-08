// client/travelsplits/src/components/modals/AddMemberModal.tsx

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/TextComponent";
import { ButtonComponent, InputComponent, RowComponent } from "../../components";
import memberAPI from "../../apis/memberApi";

interface AddMemberModalProps {
  visible: boolean; // Hiển thị hoặc ẩn modal
  onClose: () => void; // Đóng modal
  onSave: (member: string) => void; // Lưu dữ liệu
  eventId: string; // ID của sự kiện để gửi đến backend
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  visible,
  onClose,
  onSave,
  eventId,
}) => {
  const [email, setEmail] = useState<string>("");

  // console.log("eventId từ MembersTab:", eventId);

  const handleSave = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email của thành viên.");
      return;
    }
    try {
      console.log("Data being sent to API:", { email });

      const response = await memberAPI.addMemberToEvent(eventId, { email });
      console.log("Phản hồi từ API:", response);

      Alert.alert("Thành công", "Thành viên đã được thêm.");
      onSave(email);
      console.log("onSave được gọi với email:", email);
      setEmail(""); // Reset dữ liệu
      onClose(); // Đóng modal
      
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error("Lỗi từ API:", error.response.data);
        Alert.alert("Lỗi", error.response.data.message || "Không thể thêm thành viên. Vui lòng thử lại.");
      } else {
        console.error("Lỗi khi thêm thành viên:", error);
        Alert.alert("Lỗi", "Không thể thêm thành viên. Vui lòng thử lại.");
      }
    }
    
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextComponent text="Thêm Thành Viên" title />
          <InputComponent
            placeholder="Email thành viên"
            value={email}
            onChange={(text) => setEmail(text)}
          />
          <RowComponent>
            <ButtonComponent
              text="Lưu"
              styles={[styles.button]}
              type="primary"
              onPress={handleSave}
              

            />
            <ButtonComponent
              text="Hủy"
              color={appColors.danger}
              styles={[]}
              // styles={[styles.button, { backgroundColor: appColors.danger }]}
              onPress={onClose}
              type="primary"
            />
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddMemberModal;
