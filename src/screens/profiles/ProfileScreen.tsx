import { View, Text, ScrollView, ImageBackground, Button } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent, SectionComponent } from '../../components'
import ContainerComponent from '../../components/ContainerComponent'
import TextComponent from '../../components/TextComponent'
import { Card } from 'iconsax-react-native'
import CardComponent from '../../components/CardComponent'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fontFamily } from '../../constants/fontFamilies'


const ProfileScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  return (
    <>
    <ContainerComponent >
      <SectionComponent styles={{}} >
        <View>
          <TextComponent text='Thông tin người dùng' title/>
        </View>
        <RowComponent justify='flex-start' styles={{marginVertical: 20}}>
        <ImageBackground style={{height:60, width:60, padding:10}} source={require('../../assets/images/travel.png')} imageStyle={{ resizeMode:'cover', borderRadius:12}} />
        <View style={{marginLeft:20}}>
          <TextComponent text={auth.fullname} font={fontFamily.bold} />
          <TextComponent text={auth.email} font={fontFamily.bold} />
          <ButtonComponent text='Chỉnh sửa' type='link' />
        </View>
        </RowComponent>
        
      </SectionComponent>
      <ScrollView>
        <SectionComponent styles={[globalStyles.card, {backgroundColor:appColors.white2}]}>
        <TextComponent text='Ngôn ngữ' />
        
        </SectionComponent>
        <SectionComponent styles={[globalStyles.card, {backgroundColor:appColors.white2}]}>
        <TextComponent text='Loại Tiền' />
        
        </SectionComponent>
        <SectionComponent styles={[globalStyles.card, {backgroundColor:appColors.white2}]}>
        <TextComponent text='Xóa tài khoản' />
        
        </SectionComponent>
        <SectionComponent styles={[globalStyles.card, {backgroundColor:appColors.white2}]}>
        <ButtonComponent onPress={async () => {
          await AsyncStorage.setItem('auth', auth.email)
          dispatch(removeAuth({}))
          
        }} type='text' text='Đăng xuất' />
        
        </SectionComponent>
        
          
      </ScrollView>
    </ContainerComponent>
    
    </>
  )
}

export default ProfileScreen