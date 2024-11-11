import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SelectModel } from "../models/SelectModel";
import TextComponent from "./TextComponent";
import RowComponent from "./RowComponent";
import { ArrowDown2, SearchNormal } from "iconsax-react-native";
import { Modalize } from "react-native-modalize";
import { appColors } from "../constants/appColors";
import { globalStyles } from "../styles/globalStyles";
import { Portal } from "react-native-portalize";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { fontFamily } from "../constants/fontFamilies";
import SpaceComponent from "./SpaceComponent";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { app } from "../../configs/firebaseConfig";

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
  const { label, values, selected, onSelect, multiple } = props;
  const [searchKey, setSearchKey] = useState("");

  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const modalieRef = useRef<Modalize>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (isVisibleModalize) {
      modalieRef.current?.open();
    }
  }, [isVisibleModalize]);
  // console.log(values);

  useEffect(() => {
    if (isVisibleModalize && selected && selected?.length > 0) {
      setSelectedItems(selected as string[]);
    }
  }, [isVisibleModalize, selected]);

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      const data = [...selectedItems];

      const index = selectedItems.findIndex(element => element === id);
      
      if (index !== -1) {
        data.splice(index, 1);
      }
      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderSelectedItem = (id: string) => {
    const item = values.find(element => element.value === id);

    return item ? (
      <RowComponent key={id} styles={[localstyles.selectedItem]}>
        <TextComponent
          text={item.label}
          color={appColors.primary}
        />
        <SpaceComponent width={10} />
        <TouchableOpacity
          onPress={() => {
            handleSelectItem(id);
            // onSelect(selectedItems);
          }}
        >
          <AntDesign name="close" size={20} color={appColors.gray} />
        </TouchableOpacity>
      </RowComponent>
    ) : (
      <></>
    );
  };

  const renderSelectItem = (item: SelectModel) => {
    return (
      <RowComponent
        onPress={
          multiple
            ? () => handleSelectItem(item.value)
            : () => onSelect(item.value)
        }
        key={item.value}
        styles={[localstyles.listItem]}
      >
        <TextComponent
          text={item.label}
          flex={1}
          font={
            selectedItems?.includes(item.value)
              ? fontFamily.regular
              : fontFamily.medium
          }
          color={
            selectedItems?.includes(item.value)
              ? appColors.primary
              : appColors.text
          }
        />
        {selectedItems.includes(item.value) && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={22}
            color={appColors.primary}
          />
        )}
      </RowComponent>
    );
  };

  return (
    <View style={{ marginBottom: 8 }}>
      {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}
      <RowComponent
        styles={[globalStyles.inputContainer, { alignItems: "flex-start" }]}
        onPress={() => setIsVisibleModalize(true)}
      >
        <RowComponent styles={{ flex: 1, flexWrap: "wrap" }}>
          {selected? ( 
            selectedItems.length > 0 ? (
            selectedItems.map(item => renderSelectedItem(item))
          ) :(
            <TextComponent text={values.find(element => element.value === selected)?.label ?? ''}/>
          )): (
            <TextComponent text="Thêm người dùng" />
          )}
        </RowComponent>
        <ArrowDown2 size={20} color={appColors.gray} />
      </RowComponent>
      <Portal>
        <Modalize
          handlePosition="inside"
          ref={modalieRef}
          FooterComponent={
            multiple && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
                <ButtonComponent
                  text="Đồng ý thêm thành viên"
                  type="primary"
                  onPress={() => {
                    onSelect(selectedItems);
                    modalieRef.current?.close();
                  }}
                />
              </View>
            )
          }
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          HeaderComponent={
            <RowComponent
              styles={{
                marginBottom: 12,
                paddingHorizontal: 20,
                paddingTop: 30,
              }}
            >
              <View style={{ flex: 1 }}>
                <InputComponent
                  styles={{ marginBottom: 0 }}
                  placeholder="Tìm kiếm người dùng"
                  value={searchKey}
                  onChange={(val) => setSearchKey(val)}
                  allowClear
                  affix={<SearchNormal size={20} color={appColors.gray} />}
                />
              </View>
              <SpaceComponent width={20} />
              <ButtonComponent
                type="link"
                text="Hủy"
                onPress={() => modalieRef.current?.close()}
              />
            </RowComponent>
          }
          onClose={() => setIsVisibleModalize(false)}
        >
          <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
            {values.map((item) => renderSelectItem(item))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;

const localstyles = StyleSheet.create({
  listItem: {
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 0.5,
    borderColor: appColors.primary,
    padding: 4,
    marginBottom: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});
