import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import CreateModal from '../../components/features/create.modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Tổng chi phí */}
        <View style={styles.headerContainer}>
            <Text style={styles.totalCostLabel}>Tổng chi phí</Text>
            <Text style={styles.totalCost}>0 đ</Text>
        </View>

        {/* Nợ và Bị nợ */}
        <View style={styles.debtContainer}>
            <View style={styles.debtItem}>
                <FontAwesome name="arrow-circle-up" size={24} color="red" />
                <Text style={styles.debtLabel}> Còn Nợ</Text>
                <Text style={styles.debtAmount}>0 đ</Text>
            </View>
            <View style={styles.debtItem}>
                <FontAwesome name="arrow-circle-down" size={24} color="green" />
                <Text style={styles.debtLabel}>Bị Nợ</Text>
                <Text style={styles.debtAmount}>0 đ</Text>
            </View>
        </View>

        {/* All time */}
        <TouchableOpacity style={styles.allTimeButton}>
          <Text style={styles.allTimeText}>All time</Text>
        </TouchableOpacity>

        {/* Khu vực sự kiện */}
        <View style={styles.eventContainer}>
          <Text style={styles.noEventText}>Không có sự kiện nào</Text>
          <Text style={styles.eventInstruction}>Tạo một sự kiện để theo dõi và quản lý chi phí nhóm của bạn</Text>
          
          
          <Pressable 
            style={({ pressed }) => [
            { backgroundColor: pressed ? 'gray' : '#B198BD' },
            styles.createEventButton
            ]}
            onPress={() => {setModalVisible(true) }}
          >
            <Text style={styles.createEventText}>Nhấn vào tôi</Text>
          </Pressable>

          <CreateModal 
          modalVisible={isModalVisible} 
          setModalVisible={setModalVisible}
          />
          
          <Text style={styles.orText}>hoặc có thể tham gia bằng</Text>
          <Pressable style={styles.qrButton} onPress={async () => await AsyncStorage.clear()}>
            <Text style={styles.qrText}>Quét mã QR sự kiện</Text>
          </Pressable>
        </View>
      </View>

      {/* Thanh điều hướng */}
      {/* <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={28} color="#B198BD" />
          <Text style={styles.navLabel}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="map-outline" size={28} color="#B198BD" />
          <Text style={styles.navLabel}>Khám phá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#B198BD" />
          <Text style={styles.navLabel}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={28} color="#B198BD" />
          <Text style={styles.navLabel}>Hồ sơ</Text>
        </TouchableOpacity>
      </View> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  contentContainer: {
    // flex: 1,
    // padding: ,
  },
  headerContainer: {
    alignItems: 'center',
  },
  totalCostLabel: {
    fontSize: 18,
    marginTop: 8,
  },
  totalCost: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  debtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  debtItem: {
    alignItems: 'center',
  },
  debtLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  debtAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  allTimeButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  allTimeText: {
    color: '#B198BD',
  },
  eventContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  noEventText: {
    fontSize: 16,
    color: '#666',
  },
  eventInstruction: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },
  createEventButton: {
    backgroundColor: '#B198BD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  createEventText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    color: '#aaa',
    marginVertical: 10,
  },
  qrButton: {
    borderColor: '#B198BD',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  qrText: {
    color: '#B198BD',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f7f7f7',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navLabel: {
    fontSize: 12,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#B198BD',
    padding: 5,
    borderRadius: 30,
    marginVertical: 10,
  },
});

export default HomeScreen;
