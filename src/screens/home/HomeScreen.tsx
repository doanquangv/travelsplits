import { MaterialIcons } from "@expo/vector-icons";
import { HambergerMenu, Notification, SearchNormal1 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CircleComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent } from "../../components";
import EventItem from "../../components/EventItem";
import TextComponent from "../../components/TextComponent";
import { appColors } from "../../constants/appColors";
import { fontFamily } from "../../constants/fontFamilies";
import { authSelector } from "../../redux/reducers/authReducer";
import { globalStyles } from "../../styles/globalStyles";
import * as Location from 'expo-location';
import axios from "axios";
import { Address } from "react-native-maps";
import { AddressModel } from "../../models/AddressModel";


const HomeScreen = () => {
  
  const [currentLocation, setCurrentLocation] = useState<AddressModel>()

  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const position = await Location.getCurrentPositionAsync({}); // Sửa lỗi ở đây
      if (position.coords) {
        reverseGeocode({lat: position.coords.latitude, long: position.coords.longitude});
      }
    }
    getPermission();
  },[]);

  const reverseGeocode = async ({lat, long}: {lat:number; long: number}) => {
    const api= `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apikey=zSkRid2amrSBnEn9rFAVKhc0bjcLU3Aa8MaAVXRFmx8`

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const itemEvent= {
    title:'Chuyến đi leo núi 2024',
    descreption:'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More...',
    location:{
      title: 'Gala Convention Center',
      address:'36 Guild Street London, UK ',
    },
    imageUral:'',
    users:[''],
    authorId:'',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  }
 
  
  
  
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 200,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 50,
          paddingHorizontal: 20,
        }}
      >
        <RowComponent>
          <TouchableOpacity>
            <HambergerMenu color={appColors.white2} size={30} /> 
          </TouchableOpacity>
          <View style={[{ flex: 1, alignItems:'center' }]}>
          <RowComponent>
            <TextComponent text='Current Location' color={appColors.white2} size={12}/>
            <MaterialIcons name='arrow-drop-down' color={appColors.white} size={18} />
          </RowComponent>
          {
            currentLocation &&(
              <TextComponent text={`${currentLocation.address.district}, ${currentLocation.address.city}, ${currentLocation.address.county}`} flex={0} color={appColors.white2} font={fontFamily.bold} size={13}/>

            )
          }
          </View>

          <CircleComponent color="#D1C4E9">
            <Notification color={appColors.white} size={20} />
          </CircleComponent>
        </RowComponent>
        <SpaceComponent height={30} />
        <RowComponent styles={{justifyContent:'flex-start'}}>
          <RowComponent >
            <SearchNormal1 variant="TwoTone" color={appColors.white } size={20}/>
            <View style={{width:1, backgroundColor:appColors.white,marginHorizontal:10, height:18}}></View>
            <TextInput placeholder="search" style={[globalStyles.text]}/>
          </RowComponent>
        </RowComponent>
      </View>
      
      <View  
        style={[{flex:1, marginTop:16}]}
      >
        <SectionComponent styles={{paddingTop: 20}}>

          <TabBarComponent title="My Event" onPress={() => {}}/>
          <FlatList data={Array.from({length: 5})} renderItem={({item, index}) => <EventItem key={`event${index}`} item={itemEvent} type="list"/>}/>
        </SectionComponent>
      </View>
    </View>
  );
};
// const dispatch = useDispatch();
// const auth = useSelector(authSelector);

// const [isModalVisible, setModalVisible] = useState(false);

// return (
//   <View style={styles.container}>
//     <View style={styles.contentContainer}>
//       {/* Tổng chi phí */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.totalCostLabel}>Tổng chi phí</Text>
//         <Text style={styles.totalCost}>0 đ</Text>
//       </View>

//       {/* Nợ và Bị nợ */}
//       <View style={styles.debtContainer}>
//         <View style={styles.debtItem}>
//           <FontAwesome name="arrow-circle-up" size={24} color="red" />
//           <Text style={styles.debtLabel}> Còn Nợ</Text>
//           <Text style={styles.debtAmount}>0 đ</Text>
//         </View>
//         <View style={styles.debtItem}>
//           <FontAwesome name="arrow-circle-down" size={24} color="green" />
//           <Text style={styles.debtLabel}>Bị Nợ</Text>
//           <Text style={styles.debtAmount}>0 đ</Text>
//         </View>
//       </View>

//       {/* All time */}
//       <TouchableOpacity style={styles.allTimeButton}>
//         <Text style={styles.allTimeText}>All time</Text>
//       </TouchableOpacity>

//       {/* Khu vực sự kiện */}
//       <View style={styles.eventContainer}>
//         <Text style={styles.noEventText}>Không có sự kiện nào</Text>
//         <Text style={styles.eventInstruction}>
//           Tạo một sự kiện để theo dõi và quản lý chi phí nhóm của bạn
//         </Text>

//         <Pressable
//           style={({ pressed }) => [
//             { backgroundColor: pressed ? "gray" : "#B198BD" },
//             styles.createEventButton,
//           ]}
//           onPress={() => {
//             setModalVisible(true);
//           }}
//         >
//           <Text style={styles.createEventText}>Nhấn vào tôi</Text>
//         </Pressable>

//         <CreateModal
//           modalVisible={isModalVisible}
//           setModalVisible={setModalVisible}
//         />

//         <Text style={styles.orText}>hoặc có thể tham gia bằng</Text>
//         <Pressable
//           style={styles.qrButton}
//           onPress={async () => {
//             await AsyncStorage.setItem("auth", auth.email);
//             dispatch(removeAuth({}));
//           }}
//         >
//           <Text style={styles.qrText}>Quét mã QR sự kiện</Text>
//         </Pressable>
//       </View>
//     </View>

//     {/* Thanh điều hướng */}
//     {/* <View style={styles.navBar}>
//       <TouchableOpacity>
//         <Ionicons name="calendar-outline" size={28} color="#B198BD" />
//         <Text style={styles.navLabel}>Trang chủ</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Ionicons name="map-outline" size={28} color="#B198BD" />
//         <Text style={styles.navLabel}>Khám phá</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.addButton}>
//         <Ionicons name="add" size={28} color="#fff" />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Ionicons name="notifications-outline" size={28} color="#B198BD" />
//         <Text style={styles.navLabel}>Thông báo</Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Ionicons name="person-outline" size={28} color="#B198BD" />
//         <Text style={styles.navLabel}>Hồ sơ</Text>
//       </TouchableOpacity>
//     </View> */}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//   },
//   contentContainer: {
//     // flex: 1,
//     // padding: ,
//   },
//   headerContainer: {
//     alignItems: "center",
//   },
//   totalCostLabel: {
//     fontSize: 18,
//     marginTop: 8,
//   },
//   totalCost: {
//     fontSize: 32,
//     fontWeight: "bold",
//   },
//   debtContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 20,
//   },
//   debtItem: {
//     alignItems: "center",
//   },
//   debtLabel: {
//     fontSize: 16,
//     marginTop: 8,
//   },
//   debtAmount: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   allTimeButton: {
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   allTimeText: {
//     color: "#B198BD",
//   },
//   eventContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   noEventText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   eventInstruction: {
//     fontSize: 14,
//     color: "#aaa",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   createEventButton: {
//     backgroundColor: "#B198BD",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   createEventText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   orText: {
//     fontSize: 14,
//     color: "#aaa",
//     marginVertical: 10,
//   },
//   qrButton: {
//     borderColor: "#B198BD",
//     borderWidth: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   qrText: {
//     color: "#B198BD",
//     fontSize: 16,
//   },
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     height: 60,
//     backgroundColor: "#f7f7f7",
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//   },
//   navLabel: {
//     fontSize: 12,
//     color: "#888",
//   },
//   addButton: {
//     backgroundColor: "#B198BD",
//     padding: 5,
//     borderRadius: 30,
//     marginVertical: 10,
//   },
// });

export default HomeScreen;
