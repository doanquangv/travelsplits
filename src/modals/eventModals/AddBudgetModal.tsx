import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/TextComponent";
import { ButtonComponent, InputComponent, RowComponent } from "../../components";
import expenseAPI from "../../apis/expenseApi";


interface AddBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { title: string; amount: string }) => void;
  eventId: string; // Thêm eventId
}


const AddBudgetModal: React.FC<AddBudgetModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [budget, setBudget] = useState({
    title: "",
    amount: "",
    // addedBy: "",
  });
  
  const [amountError, setAmountError] = useState("");


  const handleSave = () => {
    if (!budget.amount) {
      setAmountError("Số tiền là bắt buộc.");
      return;
    }

    setAmountError(""); // Xóa lỗi nếu có
    onSave(budget); // Gọi hàm cha để xử lý dữ liệu
    setBudget({ title: "", amount: ""}); // Reset dữ liệu
    onClose(); // Đóng modal
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
          <TextComponent text="Thêm Tổng Tiền" title styles={[styles.modalTitle]}/>
          <InputComponent
            
            placeholder="Tiêu đề"
            value={budget.title}
            onChange={(text) => setBudget({ ...budget, title: text })}
          />
          <InputComponent
            
            placeholder="Số tiền"
            type="numeric"
            value={budget.amount}
            onChange={(text) => setBudget({ ...budget, amount: text })}
          />
          {amountError ? (
            <TextComponent text={amountError} color={appColors.danger} />
          ):null}
          {/* <InputComponent
            placeholder="Người thêm"
            value={budget.addedBy}
            onChange={(text) => setBudget({ ...budget, addedBy: text })}
          /> */}
          <RowComponent >
            <ButtonComponent
              text="Lưu"
              styles={[]}
              type="primary"
              onPress={handleSave}

            />
              
           
            <ButtonComponent
              text="Hủy"
              styles={[{}]}
              onPress={onClose}
              type="primary"
              color={appColors.danger}
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddBudgetModal;
