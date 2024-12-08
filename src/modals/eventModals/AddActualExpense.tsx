import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, TimePicker } from "../../components";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/TextComponent";


interface AddActualExpenseProps {
  visible: boolean; // Hiển thị hoặc ẩn modal
  onClose: () => void; // Đóng modal
  onSave: (data: {
    name: string;
    amount: string;
    category: string;
    date: string;
  }) => void; // Lưu dữ liệu
  eventId: string;
}

const AddActualExpense: React.FC<AddActualExpenseProps> = ({
  visible,
  onClose,
  onSave,
  eventId,
}) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString(), // Default to today's date
  });

  const handleSave = () => {
    onSave(expense);
    resetForm(); // Reset form sau khi lưu
    onClose(); // Đóng modal
  };

  const resetForm = () => {
    setExpense({
      name: "",
      amount: "",
      category: "",
      date: new Date().toISOString(),
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <SectionComponent styles={styles.modalContent}>
          <TextComponent
            text="Thêm Chi Phí"
            title
            styles={[styles.modalTitle]}
          />
          <ScrollView style={{ width: "100%" }}>
            {/* Tên khoản chi */}
            <InputComponent
              placeholder="Tên khoản chi"
              value={expense.name}
              onChange={(text) => setExpense({ ...expense, name: text })}
            />
            {/* Số tiền */}
            <InputComponent
              placeholder="Số tiền"
              type="numeric"
              value={expense.amount}
              onChange={(text) => setExpense({ ...expense, amount: text })}
            />
            {/* Danh mục */}
            <InputComponent
              placeholder="Danh mục (Ví dụ: Ăn uống, Đi lại)"
              value={expense.category}
              onChange={(text) => setExpense({ ...expense, category: text })}
            />
            {/* Ngày */}
            <TimePicker
              label="Ngày chi tiêu"
              type="date"
              selected={new Date(expense.date)}
              onSelect={(date) => setExpense({ ...expense, date: date.toISOString() })}
            />
            
          </ScrollView>

          {/* Nút hành động */}
          <RowComponent styles={{marginTop:10}}>
            <ButtonComponent
              text="Lưu"
              styles={[]}
              type="primary"
              onPress={handleSave}
            />
            <ButtonComponent
              text="Hủy"
              styles={[{ marginLeft: 10 }]}
              onPress={() => {
                resetForm();
                onClose();
              }}
              type="primary"
              color={appColors.danger}
            />
          </RowComponent>
        </SectionComponent>
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
    width: "85%",
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
});

export default AddActualExpense;
