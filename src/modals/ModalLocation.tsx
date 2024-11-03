import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import TextComponent from "../components/TextComponent";
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
} from "../components";
import { AntDesign } from "@expo/vector-icons";
import { Activity, SearchNormal1 } from "iconsax-react-native";
import { appColors } from "../constants/appColors";
import axios from "axios";
import { LocationModel } from "../models/LocationModel";
import MapView, { Marker } from "react-native-maps";
import { AppInfo } from "../constants/AppInfor";
import { AddressModel } from "../models/AddressModel";
import * as Location from "expo-location";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: { lat: number; long: number };
  }) => void;
}

const ModalLocation = (props: Props) => {
  const { visible, onClose, onSelect } = props;
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState("");

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

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

  useEffect(() => {
    // console.log(addressSelected);
  }, [addressSelected]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };

  const handleSelectLocation = async (address: string) => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);

      if (geocodedLocation && geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        setCurrentLocation({ lat: latitude, long: longitude }); // Cập nhật tọa độ mới
      } else {
        console.log("Không tìm thấy tọa độ cho địa chỉ này.");
      }
    } catch (error) {
      console.error("Lỗi khi chuyển đổi địa chỉ thành tọa độ:", error);
    }
  };

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=zSkRid2amrSBnEn9rFAVKhc0bjcLU3Aa8MaAVXRFmx8`;
    // const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=AIzaSyBQCV-4cbcvDdLt8UEDAw5FK78Fe6mnamQ`;

    try {
      setIsLoading(true);
      const res = await axios.get(api);

      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
      <View style={{ paddingVertical: 42 }}>
        <RowComponent justify="flex-end">
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              affix={<SearchNormal1 size={20} color={appColors.primary} />}
              value={searchKey}
              onChange={setSearchKey}
              placeholder="Search location"
              onEnd={handleSearchLocation}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 65,
              right: 10,
              left: 10,
              backgroundColor: appColors.white,
              zIndex: 5,
              padding: 20,
            }}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginBottom: 20 }}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      handleSelectLocation(item.address.label);
                      setSearchKey("");
                    }}
                  >
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={
                    searchKey
                      ? "Khôg tim thấy địa điểm"
                      : "Hãy tìm kiếm địa điểm"
                  }
                />
              </View>
            )}
          </View>
          <SpaceComponent width={10} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>
        {currentLocation && (
          <MapView
            style={{
              width: AppInfo.sizes.WIDTH,
              height: AppInfo.sizes.HEIGHT * 0.5,
              marginVertical: 65,
              zIndex: -1,
            }}
            showsUserLocation={true}
            initialRegion={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType="standard"
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
        )}

        <ButtonComponent
          text="Xác nhận"
          onPress={() => {
            onSelect({ address: addressSelected, position: currentLocation });
            onClose();
          }}
          type="primary"
        />
      </View>
    </Modal>
  );
};

export default ModalLocation;
