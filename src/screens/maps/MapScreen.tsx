import { View, Text, Dimensions, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ContainerComponent from "../../components/ContainerComponent";
import { AppInfo } from "../../constants/AppInfor";
import * as Location from "expo-location";
import { InputComponent, RowComponent, SpaceComponent } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArrowLeft2 } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import CardComponent from "../../components/CardComponent";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import eventAPI from "../../apis/eventApi";
import { eventModel } from "../../models/eventModel";
import { LinearGradient } from "expo-linear-gradient";

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<eventModel[]>([]);


  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const position = await Location.getCurrentPositionAsync({}); // Sửa lỗi ở đây
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    };
    getPermission();
  }, []);

 
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
          
          // region={{
          //   latitude: currentLocation.lat,
          //   longitude: currentLocation.long,
          //   latitudeDelta: 0.01,
          //   longitudeDelta: 0.01,
          // }}
          mapType="terrain"
          // onRegionChange={val => console.log(val)}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
            }}
            title="Bạn hiện đang ở đây"
          />
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
            onPress={() => console.log("click")}
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
export default MapScreen;
