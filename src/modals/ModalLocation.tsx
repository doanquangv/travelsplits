import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  FlatList,
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

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: string) => void;
}

const ModalLocation = (props: Props) => {
  const { visible, onClose, onSelect } = props;
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };
  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=zSkRid2amrSBnEn9rFAVKhc0bjcLU3Aa8MaAVXRFmx8`;

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
      <View style={{ paddingVertical: 42, paddingHorizontal: 20 }}>
        <RowComponent justify="flex-end">
          <View style={{ flex: 1, marginVertical: 20 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              affix={<SearchNormal1 size={20} color={appColors.primary} />}
              value={searchKey}
              onChange={setSearchKey}
              placeholder="Search location"
              onEnd={handleSearchLocation}
            />
          </View>
          <SpaceComponent width={10} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <>
                  <TextComponent text={item.address.label} />
                </>
              )}
            />
          ) : (
            <View>
              <TextComponent
                text={
                  searchKey ? "Khôg tim thấy địa điểm" : "Hãy tìm kiếm địa điểm"
                }
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocation;
