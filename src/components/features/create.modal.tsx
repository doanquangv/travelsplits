import { View, Text, Modal, Pressable, Alert, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Iprops {
    modalVisible: boolean,
    setModalVisible: (value: boolean) => void;
}

const CreateModal = (props: Iprops) => {
    
    const {modalVisible, setModalVisible} = props;

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable style={styles.container} onPress={()=> setModalVisible(false)}>
            <View style={styles.modalView}>
                {/* Header */}
                <View style={styles.header}>
                    <AntDesign onPress={()=> setModalVisible(false)} name="close" size={24} color="black" />
                    <Text style={{fontSize:20,fontWeight:500}}>Thêm mới sự kiện</Text>
                </View>
                {/* Body */}
                <View>
                    <View style={styles.groupInput}>
                        <Text style = {styles.text}>Tên sự kiện</Text>
                        <TextInput style = {styles.input} placeholder='ví dụ: Chuyến đi chơi hè' placeholderTextColor={"#A9A9A9"}/>
                        
                    </View>
                </View>
                {/* Footer */}
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
        </Pressable>
      </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        // backgroundColor: "white",
        justifyContent: "flex-end",
        // backgroundColor: "rgba(0, 0, 0, 0.5)",  // Làm mờ phần nền bên ngoài modal

    },
    modalView: {
        // width: '90%',  // Đặt chiều rộng modal chiếm 90% màn hình
        height: '30%',  // Đặt chiều cao modal chiếm 1/3 màn hình (tức là 30%)
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        // alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#B198BD',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom:10
    },
    groupInput: {
        padding: 10,
        marginBottom:10,

    },
    input: {
        borderWidth: 2,
        borderColor: '#B198BD',
        marginVertical:10,
        padding:12,
        borderRadius: 10,
    },
    text: {
        fontSize:16,
        

    },
    button: {
        // width: '100%',  // Kích thước button bằng với TextInput
        backgroundColor: '#B198BD',  // Màu nền của button
        padding: 12,  // Padding cho button
        borderRadius: 10,
        alignItems: 'center',  // Căn chữ vào giữa
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
  });

export default CreateModal