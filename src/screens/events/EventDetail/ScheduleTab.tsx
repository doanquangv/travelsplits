// client/travelsplits/src/screens/events/ScheduleTab.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { appColors } from "../../../constants/appColors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { globalStyles } from "../../../styles/globalStyles";
import { ButtonComponent } from "../../../components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Schedule } from "../../../models/ScheduleModel";
import scheduleAPI from "../../../apis/scheduleApi";
import { RootStackParamList } from "../../../navigations/types";
import { StackNavigationProp } from '@react-navigation/stack';
import { Modalize } from "react-native-modalize";
import AddNewScheduleModal from "../../../modals/eventModals/AddScheduleModal";



type ScheduleTabRouteProp = RouteProp<RootStackParamList, 'ScheduleTab'>;
type ScheduleTabNavigationProp = StackNavigationProp<RootStackParamList, 'ScheduleTab'>;

const ScheduleTab = ({ eventId }: { eventId: string }) => {
  const navigation = useNavigation<ScheduleTabNavigationProp>();
  const route = useRoute<ScheduleTabRouteProp>();

  const modalizeRef = useRef<Modalize>(null);



  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  const openModal = () => {
    modalizeRef.current?.open();
  };

 

  const fetchSchedules = async () => {

    try {
      const res = await scheduleAPI.getSchedules(eventId);
      if (res) {
        
        setScheduleData(res.data);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      
    }
  };
  
  useEffect(() => {

    if (eventId) {
      fetchSchedules();
    }
  }, [eventId]);

  const handleSchedulePress = (item: Schedule) => {
    navigation.navigate("ScheduleDetailScreen", { eventId, scheduleId: item._id });

  };

  // const handleAddSchedule = () => {
  //   navigation.navigate("AddNewSchedule", { eventId, fetchSchedules });
  // };

  const renderScheduleItem = ({ item }: { item: Schedule }) => (
    <TouchableOpacity onPress={() => handleSchedulePress(item)}>
      <CardComponent styles={[globalStyles.card, styles.scheduleCard]}>
        <View style={styles.scheduleIcon}>
          <FontAwesome5 name="calendar-check" size={24} color={appColors.primary} />
        </View>
        <View style={styles.scheduleDetails}>
          <TextComponent text={item.name} font="Roboto-Medium" size={16} />
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Ionicons name="location-sharp" size={16} color={appColors.primary} />
            <TextComponent
              text={item.address}
              size={14}
              styles={{ marginLeft: 5 }}
            />
          </View>
          {/* <TextComponent
            text={item.address}
            size={14}
            color={appColors.gray}
            styles={{ marginTop: 5 }}
          /> */}
        </View>
      </CardComponent>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonComponent
            text="Th 7, 23/11"
            type="link"
            styles={styles.dateButton}
            color={appColors.primary}
          />
        </ScrollView>
      </View>

      <ButtonComponent text="Thêm hoạt động" type='primary' onPress={openModal} />

      <FlatList
        data={scheduleData}
        keyExtractor={(item) => item._id}
        renderItem={renderScheduleItem}
        contentContainerStyle={styles.listContent}
      />

      <AddNewScheduleModal ref={modalizeRef} eventId={eventId} fetchSchedules={fetchSchedules} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: appColors.white2,
  },
  header: {
    marginBottom: 16,
  },
  dateButton: {
    borderColor: appColors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addActivityButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  listContent: {
    paddingBottom: 80,
  },
  scheduleCard: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    backgroundColor: appColors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  scheduleIcon: {
    marginRight: 12,
  },
  scheduleDetails: {
    flex: 1,
  },
});

export default ScheduleTab;
