import React, { useState, useRef, ReactNode } from 'react';
import { View, Platform } from 'react-native';
import ButtonComponent from './ButtonComponent';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import TextComponent from './TextComponent';
import { Camera,  } from 'iconsax-react-native';
import { Image } from 'react-native';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import { fontFamily } from '../constants/fontFamilies';
import * as ImagePicker from 'expo-image-picker'; // Sử dụng expo-image-picker
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface Props {
  onSelect: (val:{
    type: 'url' | 'file',
    value: any
  }) => void;
 }

const ButtonImagePicker = (props: Props) => {

  const { onSelect } = props;


  const modalizeRef = useRef<Modalize>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>();
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null); 

  const ChoiceImages = [
    {
      key: 'camera',
      title: 'Chụp ảnh',
      icon: <Camera size={20} color='#000' />,
    },

    {
      key: 'library', 
      title: 'Chọn từ thư viện',
      icon: <EvilIcons name="image" size={24} color="black" />,
    },
    
  ];

  const renderItem = (item: { icon: ReactNode; key: string; title: string }) => (
    <RowComponent key={item.key} styles={{ marginBottom: 20 }} onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceComponent width={12} />
      <TextComponent text={item.title} flex={1} font={fontFamily.medium} />
    </RowComponent>

  );

  const handleChoiceImage = async (key: string) => {
    modalizeRef.current?.close(); // Đóng modal sau khi chọn

    switch (key) {
      case 'camera':
        // Xin cấp quyền camera
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Bạn cần cấp quyền cho ứng dụng sử dụng camera!");
          return;
        }

        const cameraResult = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!cameraResult.canceled) {
          setSelectedImageUri(cameraResult.assets[0].uri); // Lưu URI vào state
          onSelect({ type: 'file', value: cameraResult.assets[0] }); 
        }
        break;

      case 'library':
        const libraryResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!libraryResult.canceled) {
          setSelectedImageUri(libraryResult.assets[0].uri); // Lưu URI vào state
      onSelect({ type: 'file', value: libraryResult.assets[0] }); 
        }
        break;

      default:
        console.log(key);
        break;
    }
    
  };

  return (
    <View style={{ marginBottom: 20 }}>
        {selectedImageUri && ( // Kiểm tra nếu có ảnh đã chọn
        <Image
          source={{ uri: selectedImageUri }}
          style={{ width: 200, height: 200, marginBottom: 10,justifyContent:'center' ,alignItems:'center'}} // Điều chỉnh style theo ý muốn
        />
      )}
      <ButtonComponent text='Tải lên hình ảnh' type='link' onPress={() => modalizeRef.current?.open()} />
      <Portal>
        <Modalize adjustToContentHeight ref={modalizeRef} handlePosition='inside'>
          <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
            {ChoiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
}

export default ButtonImagePicker;