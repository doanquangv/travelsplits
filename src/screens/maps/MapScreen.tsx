import { View, Text, Dimensions, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import ContainerComponent from "../../components/ContainerComponent";
import { AppInfo } from "../../constants/AppInfor";
import * as Location from "expo-location";
import { InputComponent, RowComponent, SpaceComponent } from "../../components";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ArrowLeft2 } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import CardComponent from "../../components/CardComponent";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import eventAPI from "../../apis/eventApi";
import { eventModel } from "../../models/eventModel";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<eventModel[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null); 

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const position = await Location.getCurrentPositionAsync({}); 
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        fetchHotels(position.coords.latitude, position.coords.longitude);
      }
    };
    getPermission();
  }, []);

  const fetchHotels = async (latitude: number, longitude: number) => {
    try {
       
      const url = `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=hotel&limit=10&apiKey=${process.env.HERE_API_KEY}`;
      
      const response = await axios.get(url);
      if (response.data.items) {
        setHotels(response.data.items);
      }
    } catch (error) {
      console.error("Lỗi khi tải thông tin nhà nghỉ:", error);
    }
  };

  // const handleMyLocationPress = () => {
  //   if (currentLocation && mapRef.current) {
  //     mapRef.current.animateToRegion(
  //       {
  //         latitude: currentLocation.lat,
  //         longitude: currentLocation.long,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01,
  //       },
  //       1000 
  //     );
  //   }
  // };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      {currentLocation ? (
        <MapView
          style={{
            width: AppInfo.sizes.WIDTH,
            height: AppInfo.sizes.HEIGHT,
          }}
          showsUserLocation={true}
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          
          mapType="terrain"        >
          <Marker
            coordinate={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
            }}
            title="Bạn hiện đang ở đây"
          />
           {hotels.map((hotel, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hotel.position.lat,
                longitude: hotel.position.lng,
              }}
              title={hotel.address}
              description={hotel.address.label}
            />
          ))}
        </MapView>
      ) : (
        <></>
      )}

      <View
        style={{
          position: "absolute",
          // backgroundColor: "rgba(255, 255, 255, 0.5)",
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48,
        }}
      >
        
        <RowComponent>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Home")
                  }
                >
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search"
              value=""
              onChange={(val) => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
          //  onPress={handleMyLocationPress}
            styles={[globalStyles.noSpaceCard, { width: 56, height: 56 }]}
            color={appColors.white}
          >
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        
      </View>
      <View
        style={{
          position: "absolute",
          top: "60%",
          right: 0,
          left: 0,
          backgroundColor: appColors.white,
          height: "40%",
          paddingHorizontal: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
          Danh sách nhà nghỉ gần đây
        </Text>
        <FlatList
          data={hotels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.hotelItem}>
              <Text style={styles.hotelName}>{item.title}</Text>
              <Text style={styles.hotelAddress}>{item.address.label}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height:100,
  },
  hotelItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hotelAddress: {
    fontSize: 14,
    color: "#777",
  },
});
export default MapScreen;
