import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from 'expo-location';
import { HambergerMenu, Notification, SearchNormal1 } from "iconsax-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import eventAPI from "../../apis/eventApi";
import { CircleComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent } from "../../components";
import EventItem from "../../components/EventItem";
import TextComponent from "../../components/TextComponent";
import { appColors } from "../../constants/appColors";
import { fontFamily } from "../../constants/fontFamilies";
import { AddressModel } from "../../models/AddressModel";
import { authSelector } from "../../redux/reducers/authReducer";
import { eventSelector, setEvents } from "../../redux/reducers/eventReducer";
import { globalStyles } from "../../styles/globalStyles";



const HomeScreen = () => {
  
  const [currentLocation, setCurrentLocation] = useState<AddressModel>()
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  // console.log(process.env.MAP_API_KEY);
  

  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const events = useSelector(eventSelector);
  

  // Trong HomeScreen.js

  const fetchEvents = useCallback (async () => {
    try {
      const api = '/get-events'; // Thay thế bằng endpoint API của bạn
      const res = await eventAPI.HandleEvent(api); 
      // console.log(res);
      
      if (res && res.data) {
        console.log("Dispatching action setEvents with payload:", res);
        dispatch(setEvents(res.data)); // Truyền đúng dữ liệuRedux store
      }
    
      
      setIsLoading(false);
      
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sự kiện:', error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
    }
  },[dispatch])

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // useEffect(() => {
  //   console.log("Updated events:", events);
  // }, [events]);


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
    
     const api= `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apikey=${process.env.HERE_API_KEY}`

   

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
        
      }
    } catch (error) {
      console.error('Lỗi khi reverse geocode:', error);
      
    }
  }
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, [fetchEvents]);

  // const itemEvent= {
  //   title:'Chuyến đi leo núi 2024',
  //   descreption:'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More...',
  //   location:{
  //     title: 'Gala Convention Center',
  //     address:'36 Guild Street London, UK ',
  //   },
  //   imageUral:'',
  //   users:[''],
  //   authorId:'',
  //   startAt: Date.now(),
  //   endAt: Date.now(),
  //   date: Date.now(),
  // }
 
  
  
  
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
          {/* <FlatList data={Array.from({length: 5})} renderItem={({item, index}) => <EventItem key={`event${index}`} item={itemEvent} type="list"/>}/> */}
          
          <FlatList
            data={events}
            keyExtractor={(item, index) => item._id ? item._id : index.toString()}
            renderItem={({ item }) => (
              <EventItem item={item} type="list" />
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 20 }} />}
            refreshing={refreshing}
            onRefresh={handleRefresh}

        />

        </SectionComponent>
      </View>
      
    </View>
  );
};
// const dispatch = useDispatch();
// const auth = useSelector(authSelector);



export default HomeScreen;


