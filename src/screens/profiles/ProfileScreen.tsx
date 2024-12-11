import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Modal, StyleSheet, Alert } from 'react-native';
import { ButtonComponent, RowComponent, SectionComponent, InputComponent, ButtonImagePicker } from '../../components';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '../../components/TextComponent';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth, updateAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamily } from '../../constants/fontFamilies';
import { TouchableOpacity } from 'react-native-gesture-handler';
import userAPI from "../../apis/userApi";
import { useNavigation } from "@react-navigation/native";

const uploadImageToCloudinary = async (imageUri: string) => {
  const data = new FormData();
  const file = {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any;
  data.append("file", file);
  data.append("upload_preset", "j4uytbqh");
  data.append("cloud_name", "dprqrzuba");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dprqrzuba/image/upload", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.secure_url; 
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error);
    return null;
  }
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fullname, setFullname] = useState(auth.fullname);
  const [email, setEmail] = useState(auth.email);
  const [photoURL, setPhotoURL] = useState(auth.photoURL || ""); // Nếu có trường photoURL
  const [tempPhotoURL, setTempPhotoURL] = useState(auth.photoURL || "");

  // Xử lý xóa tài khoản
  const handleDeleteAccount = async () => {
    try {
      await userAPI.HandleUser('/delete', {}, 'delete');
      // Xóa thông tin người dùng khỏi Redux và AsyncStorage

      dispatch(removeAuth());
      await AsyncStorage.removeItem('auth');
      setShowDeleteModal(false);
      Alert.alert('Thông báo', 'Tài khoản đã bị xóa.');
      // navigation.navigate('LoginScreen'); // Quay lại màn hình đăng nhập
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể xóa tài khoản. Vui lòng thử lại.');
    }
  };

  // Xử lý thay đổi mật khẩu
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp");
      return;
    }
    try {
      await userAPI.HandleUser('/change-password', {oldPassword, newPassword}, 'put');
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công');
      setShowChangePasswordModal(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Đổi mật khẩu thất bại, hãy kiểm tra lại mật khẩu cũ.');
    }
  };

  const handleImageSelected = async (imageData: { type: 'file' | 'url', value: any }) => {
    if (imageData.type === 'file') {
      const cloudinaryUrl = await uploadImageToCloudinary(imageData.value.uri);
      if (cloudinaryUrl) {
        setTempPhotoURL(cloudinaryUrl);
      }
    } else {
      setTempPhotoURL(imageData.value);
    }
  };

  const handleEditProfile = async () => {
    try {
      const payload = {
        fullname: fullname,
        email: email
      } as any;

      if (tempPhotoURL && tempPhotoURL !== photoURL) {
        payload.photoURL = tempPhotoURL;
      }

      const res = await userAPI.HandleUser('/update-profile', payload, 'put');

      // Cập nhật redux
      dispatch(updateAuth({
        fullname: res.data.fullname,
        email: res.data.email,
        // Nếu trả về photoURL từ server
        ...(res.data.photoURL ? { photoURL: res.data.photoURL } : {})
      }));

      Alert.alert('Thông báo', 'Chỉnh sửa thông tin thành công');
      setShowEditProfileModal(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin.');
    }
  };

  const handleLogout = async () => {
    dispatch(removeAuth());
    await AsyncStorage.removeItem('auth');
    setShowLogoutModal(false);
    // navigation.replace('LoginScreen'); // Quay lại màn hình đăng nhập
  };
  return (
    <>
      <ContainerComponent>
        <SectionComponent styles={{}}>
          <View>
            <TextComponent text='Thông tin người dùng' title />
          </View>
          <RowComponent justify='flex-start' styles={{ marginVertical: 20 }}>
            <ImageBackground
              style={{ height: 60, width: 60, padding: 10 }}
              source={photoURL ? { uri: photoURL } : require('../../assets/images/travel.png')}
              imageStyle={{ resizeMode: 'cover', borderRadius: 12 }}
            />
            <View style={{ marginLeft: 20 }}>
              <TextComponent text={auth.fullname} font={fontFamily.bold} />
              <TextComponent text={auth.email} font={fontFamily.bold} />
              <ButtonComponent text='Chỉnh sửa' type='link' onPress={() => {
                setTempPhotoURL(photoURL);
                setFullname(auth.fullname);
                setEmail(auth.email);
                setShowEditProfileModal(true);
              }} />
            </View>
          </RowComponent>
        </SectionComponent>
        <ScrollView>
          {/* <SectionComponent styles={[globalStyles.card, { backgroundColor: appColors.white2 }]}>
            <TextComponent text='Ngôn ngữ' />
          </SectionComponent>
          <SectionComponent styles={[globalStyles.card, { backgroundColor: appColors.white2 }]}>
            <TextComponent text='Loại Tiền' />
          </SectionComponent> */}
          <TouchableOpacity
            style={[globalStyles.card, { backgroundColor: appColors.white2, padding: 16, borderRadius: 8 }]}
            onPress={() => setShowChangePasswordModal(true)}
          >
            <TextComponent text='Thay đổi mật khẩu' color={appColors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.card, { backgroundColor: appColors.white2, padding: 16, borderRadius: 8 }]}
            onPress={() => setShowDeleteModal(true)}
          >
            <TextComponent text='Xóa tài khoản' color={appColors.danger} />
          </TouchableOpacity>
          <SectionComponent styles={[globalStyles.card, { backgroundColor: appColors.white2 }]}>
            <ButtonComponent
              onPress={() => setShowLogoutModal(true)}
              type='text'
              text='Đăng xuất'
            />
          </SectionComponent>
        </ScrollView>
      </ContainerComponent>

       {/* Modal xác nhận đăng xuất */}
       <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextComponent
              text="Xác nhận đăng xuất"
              title
              styles={{ marginBottom: 15 }}
            />
            <TextComponent text="Bạn có chắc chắn muốn đăng xuất?" />
            <RowComponent styles={{ marginTop: 20 }}>
              <ButtonComponent
                text="Đăng xuất"
                type="primary"
                onPress={handleLogout}
                styles={{ marginRight: 10 }}
              />
              <ButtonComponent
                text="Hủy"
                type="primary"
                color={appColors.danger}
                onPress={() => setShowLogoutModal(false)}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>

      {/* Modal xác nhận xóa tài khoản */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextComponent
              text="Xác nhận xóa tài khoản"
              title
              styles={{ marginBottom: 15 }}
            />
            <TextComponent text="Bạn có chắc chắn muốn xóa tài khoản này không?" />
            <RowComponent styles={{ marginTop: 20 }}>
              <ButtonComponent
                text="Xóa"
                type="primary"
                color={appColors.danger}
                onPress={handleDeleteAccount}
                styles={{ marginRight: 10 }}
              />
              <ButtonComponent
                text="Hủy"
                type="primary"
                onPress={() => setShowDeleteModal(false)}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>

      {/* Modal thay đổi mật khẩu */}
      <Modal
        visible={showChangePasswordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChangePasswordModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextComponent
              text="Thay đổi mật khẩu"
              title
              styles={{ marginBottom: 15 }}
            />
            <InputComponent
              placeholder="Mật khẩu cũ"
              value={oldPassword}
              onChange={(text) => setOldPassword(text)}
              styles={{ marginBottom: 10 }}
              isPassword
            />
            <InputComponent
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(text) => setNewPassword(text)}
              styles={{ marginBottom: 10 }}
              isPassword
            />
            <InputComponent
              placeholder="Xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChange={(text) => setConfirmNewPassword(text)}
              styles={{ marginBottom: 10 }}
              isPassword
            />
            <RowComponent styles={{ marginTop: 20 }}>
              <ButtonComponent
                text="Xác nhận"
                type="primary"
                onPress={handleChangePassword}
                styles={{ marginRight: 10 }}
              />
              <ButtonComponent
                text="Hủy"
                type="primary"
                color={appColors.danger}
                onPress={() => setShowChangePasswordModal(false)}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>

      {/* Modal chỉnh sửa thông tin người dùng */}
      <Modal
        visible={showEditProfileModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditProfileModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextComponent
              text="Chỉnh sửa thông tin người dùng"
              title
              styles={{ marginBottom: 15 }}
            />
            <ButtonImagePicker onSelect={handleImageSelected} />

            {tempPhotoURL ? (
              <ImageBackground
                style={{ height: 60, width: 60, marginTop:10 }}
                source={{ uri: tempPhotoURL }}
                imageStyle={{ resizeMode: 'cover', borderRadius: 12 }}
              />
            ) : null}

            <InputComponent
              placeholder="Họ và tên"
              value={fullname}
              onChange={(text) => setFullname(text)}
              styles={{ marginBottom: 10 }}
            />
            <InputComponent
              placeholder="Email"
              value={email}
              onChange={(text) => setEmail(text)}
              styles={{ marginBottom: 10 }}
            />
            <RowComponent styles={{ marginTop: 20 }}>
              <ButtonComponent
                text="Lưu"
                type="primary"
                onPress={handleEditProfile}
                styles={{ marginRight: 10 }}
              />
              <ButtonComponent
                text="Hủy"
                type="primary"
                onPress={() => setShowEditProfileModal(false)}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ProfileScreen;
