import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
} from "iconsax-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import eventAPI from "../../apis/eventApi";
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
} from "../../components";
import EventItem from "../../components/EventItem";
import TextComponent from "../../components/TextComponent";
import { appColors } from "../../constants/appColors";
import { fontFamily } from "../../constants/fontFamilies";
import { AddressModel } from "../../models/AddressModel";
import { authSelector } from "../../redux/reducers/authReducer";
import { eventSelector, setEvents } from "../../redux/reducers/eventReducer";
import { globalStyles } from "../../styles/globalStyles";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/useAuth";
import { eventModel } from "../../models/eventModel";
import debounce from "lodash.debounce";
import { useFocusEffect } from "@react-navigation/native";


const HomeScreen = () => {
  
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<eventModel[]>([]);

  
  const dispatch = useDispatch();
  const { auth, login, logout } = useAuth();
  const events = useSelector(eventSelector);

  const fetchEvents = useCallback(
    async (searchTerm: string = "") => {
      try {
        let api = "/get-events";
        if (searchTerm.trim() !== "") {
          api += `?query=${encodeURIComponent(searchTerm)}`;
        }
        const res = await eventAPI.HandleEvent(api);
        if (res && res.data) {
          dispatch(setEvents(res.data));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
        Alert.alert(
          "Error",
          "Không thể lấy danh sách sự kiện. Vui lòng thử lại sau."
        );
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchEvents(searchQuery);
    }, 300); // 300ms debounce

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchEvents, searchQuery]);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert(
          "Quyền Truy Cập Vị Trí",
          "Ứng dụng cần quyền truy cập vị trí để hoạt động tốt hơn. Bạn có muốn mở cài đặt để cấp quyền không?",
          [
            { text: "Không", style: "cancel" },
            { text: "Mở Cài Đặt", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({}); // Sửa lỗi ở đây
      if (position.coords) {
        reverseGeocode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    };
    getPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEvents(searchQuery);
    }, [fetchEvents, searchQuery])
  );

  const reverseGeocode = async ({
    lat,
    long,
  }: {
    lat: number;
    long: number;
  }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apikey=${process.env.HERE_API_KEY}`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      } else {
        console.log("Không tìm thấy địa chỉ");
        // Hiển thị thông báo cho người dùng nếu cần
      }
    } catch (error) {
      console.error("Lỗi khi reverse geocode:", error);
    }
  };
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents(searchQuery); // Gọi với searchQuery hiện tại
    setRefreshing(false);
  }, [fetchEvents, searchQuery]);

  const renderItem = useCallback(
    ({ item }: { item: eventModel }) => {
      if (!item) {
        return null; // hoặc xử lý lỗi phù hợp
      }
      return <EventItem item={item} type="list" />;
    },
    []
  );
  

  const keyExtractor = useCallback((item: eventModel) => item?._id?.toString() || Math.random().toString(), []);

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
    <Pressable  style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      
      <View style={[globalStyles.container]}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            backgroundColor: appColors.primary,
            height: 200,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
            paddingHorizontal: 20,
          }}
        >
          <RowComponent>
            <TouchableOpacity>
              <HambergerMenu color={appColors.white2} size={30} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: "center" }]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  color={appColors.white}
                  size={18}
                />
              </RowComponent>
              {currentLocation?.address?.district &&
                currentLocation?.address?.city &&
                currentLocation?.address?.county && (
                  <TextComponent
                    text={`${currentLocation.address.district}, ${currentLocation.address.city}, ${currentLocation.address.county}`}
                    flex={0}
                    color={appColors.white2}
                    font={fontFamily.bold}
                    size={13}
                  />
                )}
            </View>

            <CircleComponent color="#D1C4E9">
              <Notification color={appColors.white} size={20} />
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={30} />
          <RowComponent styles={{ justifyContent: "flex-start" }}>
            <RowComponent>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.white,
                  marginHorizontal: 10,
                  height: 18,
                }}
              ></View>
              <TextInput
                placeholder="Tìm sự kiện"
                placeholderTextColor={appColors.white}
                style={[
                  globalStyles.text,
                  {
                    flex: 1,
                    color: appColors.white,
                    fontFamily: fontFamily.regular,
                  },
                ]}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                
              />
              {searchQuery !== "" && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <MaterialIcons name="clear" size={25} color={appColors.white} />
                </TouchableOpacity>
              )}
            </RowComponent>
          </RowComponent>
        </View>

        <View style={[{ flex: 1, marginTop: 16 }]}>
          <SectionComponent styles={{ paddingTop: 20 }}>
            <TabBarComponent title="Sự Kiện của Tôi" onPress={() => {}} />
            {/* <FlatList data={Array.from({length: 5})} renderItem={({item, index}) => <EventItem key={`event${index}`} item={itemEvent} type="list"/>}/> */}

            <FlatList
              data={events || []}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={<View style={{ height: 20 }} />}
              ListEmptyComponent={
                <TextComponent
                  text="Không có sự kiện nào hiện tại."
                  styles={{ textAlign: "center" }}
                  color={appColors.gray}
                />
              }
              refreshing={refreshing}
              onRefresh={() => fetchEvents(searchQuery)}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={21}
              getItemLayout={(data, index) => ({
                length: 100,
                offset: 100 * index,
                index,
              })}
            />
          </SectionComponent>
        </View>
      </View>
    </Pressable>
  );
};
// const dispatch = useDispatch();
// const auth = useSelector(authSelector);

export default HomeScreen;
