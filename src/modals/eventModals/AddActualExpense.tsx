import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TimePicker } from "../../components";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/TextComponent";
import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";


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

const defaultCategories = [
  { label: "Ăn uống", value: "Ăn uống" },
  { label: "Đi lại", value: "Đi lại" },
  { label: "nghỉ dưỡng", value: "nghỉ dưỡng" },
  { label: "Mua sắm", value: "Mua sắm" },
  { label: "Vui chơi", value: "Vui chơi" },
  { label: "Khác", value: "Khác" },
];

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
  const [showCategoryModal, setShowCategoryModal] = useState(false);


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
            <TouchableOpacity
              onPress={() => setShowCategoryModal(true)}
              style={styles.categoryPicker}
            >
              <TextComponent
                text={
                  expense.category ? expense.category : "Chọn danh mục..."
                }
                color={expense.category ? appColors.text : appColors.gray}
              />
            </TouchableOpacity>
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
        <Modal
          visible={showCategoryModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCategoryModal(false)}
        >
          <View style={styles.categoryModalContainer}>
            <View style={styles.categoryModalContent}>
              <TextComponent
                text="Chọn Danh Mục"
                title
                styles={{ marginBottom: 20 }}
              />
              <FlatList
                data={defaultCategories}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setExpense({ ...expense, category: item.value });
                      setShowCategoryModal(false);
                    }}
                    style={styles.categoryItem}
                  >
                    <TextComponent text={item.label} />
                  </TouchableOpacity>
                )}
              />
              <SpaceComponent height={10}/>
              <ButtonComponent 
                text="Đóng"
                onPress={() => setShowCategoryModal(false)}
                type="primary"
              />
            </View>
          </View>
        </Modal>
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
  
  categoryPicker: {
    padding: 15,
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: appColors.white,
  },
  categoryModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  categoryModalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
});

export default AddActualExpense;
