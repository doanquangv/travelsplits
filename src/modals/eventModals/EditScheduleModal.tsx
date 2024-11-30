// client/travelsplits/src/components/modals/EditScheduleModal.tsx

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Modalize } from "react-native-modalize";
import TextComponent from "../../components/TextComponent";
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent } from "../../components";
import { appColors } from "../../constants/appColors";

interface EditScheduleModalProps {
  ref: any; // Ref của Modalize
  selectedSchedule: any;
  onSave: (updatedSchedule: any) => void;
}

const EditScheduleModal = React.forwardRef<Modalize, EditScheduleModalProps>(
  ({ selectedSchedule, onSave }, ref) => {
    const [editedSchedule, setEditedSchedule] = useState(selectedSchedule);

    // Cập nhật dữ liệu khi có thay đổi từ props
    useEffect(() => {
      setEditedSchedule(selectedSchedule);
    }, [selectedSchedule]);

    const handleSave = () => {
      onSave(editedSchedule);
    //   ref.current?.close();
    };

    if (!selectedSchedule) {
      return null;
    }

    return (
      <Modalize ref={ref} modalHeight={450}>
        <View style={styles.modalContent}>
          <TextComponent text="Chỉnh sửa lịch trình" title styles={styles.title} />
          <InputComponent
            styles={styles.input}
            value={editedSchedule?.name}
            onChange={(text) => setEditedSchedule({ ...editedSchedule, name: text })}
            placeholder="Tên điểm đến"
          />
          <SpaceComponent height={10} />
          <InputComponent
            styles={styles.input}
            value={editedSchedule?.location}
            onChange={(text) => setEditedSchedule({ ...editedSchedule, location: text })}
            placeholder="Địa điểm"
          />
          <SpaceComponent height={10} />
          <InputComponent
            styles={styles.input}
            value={editedSchedule?.address}
            onChange={(text) => setEditedSchedule({ ...editedSchedule, address: text })}
            placeholder="Địa chỉ"
          />
          <SpaceComponent height={20} />
          <RowComponent>
            <ButtonComponent text="Lưu" type="primary" onPress={handleSave} />
          </RowComponent>
        </View>
      </Modalize>
    );
  }
);

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
});

export default EditScheduleModal;
