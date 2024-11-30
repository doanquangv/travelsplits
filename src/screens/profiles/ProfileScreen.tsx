import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Modal, StyleSheet } from 'react-native';
import { ButtonComponent, RowComponent, SectionComponent, InputComponent } from '../../components';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '../../components/TextComponent';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamily } from '../../constants/fontFamilies';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fullname, setFullname] = useState(auth.fullname);
  const [email, setEmail] = useState(auth.email);

  // Xử lý xóa tài khoản
  const handleDeleteAccount = async () => {
    // Xóa thông tin người dùng khỏi Redux và AsyncStorage
    dispatch(removeAuth());
    await AsyncStorage.removeItem('auth');
    setShowDeleteModal(false);
    console.log('Tài khoản đã bị xóa.');
  };

  // Xử lý thay đổi mật khẩu
  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp");
      return;
    }
    // Thực hiện logic thay đổi mật khẩu ở đây (ví dụ: gửi yêu cầu lên server)
    console.log("Thay đổi mật khẩu thành công");
    setShowChangePasswordModal(false);
  };

  // Xử lý chỉnh sửa thông tin người dùng
  const handleEditProfile = () => {
    // Thực hiện logic chỉnh sửa thông tin ở đây (ví dụ: gửi yêu cầu lên server)
    console.log("Chỉnh sửa thông tin thành công");
    setShowEditProfileModal(false);
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
              source={require('../../assets/images/travel.png')}
              imageStyle={{ resizeMode: 'cover', borderRadius: 12 }}
            />
            <View style={{ marginLeft: 20 }}>
              <TextComponent text={auth.fullname} font={fontFamily.bold} />
              <TextComponent text={auth.email} font={fontFamily.bold} />
              <ButtonComponent text='Chỉnh sửa' type='link' onPress={() => setShowEditProfileModal(true)} />
            </View>
          </RowComponent>
        </SectionComponent>
        <ScrollView>
          <SectionComponent styles={[globalStyles.card, { backgroundColor: appColors.white2 }]}>
            <TextComponent text='Ngôn ngữ' />
          </SectionComponent>
          <SectionComponent styles={[globalStyles.card, { backgroundColor: appColors.white2 }]}>
            <TextComponent text='Loại Tiền' />
          </SectionComponent>
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
              onPress={async () => {
                dispatch(removeAuth());
                await AsyncStorage.removeItem('auth');
              }}
              type='text'
              text='Đăng xuất'
            />
          </SectionComponent>
        </ScrollView>
      </ContainerComponent>

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
            />
            <InputComponent
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(text) => setNewPassword(text)}
              
              styles={{ marginBottom: 10 }}
            />
            <InputComponent
              placeholder="Xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChange={(text) => setConfirmNewPassword(text)}
              
              styles={{ marginBottom: 10 }}
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
