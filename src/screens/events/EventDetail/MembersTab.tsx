// client/travelsplits/src/screens/events/MembersTab.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { appColors } from "../../../constants/appColors";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { globalStyles } from "../../../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { ButtonComponent } from "../../../components";
import { fontFamily } from "../../../constants/fontFamilies";
import memberAPI from "../../../apis/memberApi";
import AddMemberModal from "../../../modals/eventModals/AddMemberModal";
import { Member } from "../../../models/memberModel";
import { Trash } from "iconsax-react-native";

const MembersTab = ({ eventId }: { eventId: string }) => {
  
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await memberAPI.getEventMembers(eventId);
      console.log("Dữ liệu thành viên:", res);
      
      if (res && Array.isArray(res)) {
        setMembersData(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setMembersData(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thành viên:", error);
    }
  };
  
  // Sử dụng trong useEffect
  useEffect(() => {
    if (eventId) {
      fetchMembers();
    }
  }, [eventId]);

  const handleRemoveMember = (memberId: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa thành viên này không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy xóa thành viên"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await memberAPI.removeMemberFromEvent(eventId, memberId);
              Alert.alert("Thành công", "Xóa thành viên thành công.");
              fetchMembers(); // Cập nhật lại danh sách thành viên sau khi xóa thành công
            } catch (error) {
              console.error("Lỗi khi xóa thành viên:", error);
              Alert.alert("Lỗi", "Không thể xóa thành viên. Vui lòng thử lại.");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  
  
  // Sử dụng khi thành viên mới được thêm
  const handleMemberAdded = (email: string) => {
    setIsAddMemberModalVisible(false);
    fetchMembers(); // Cập nhật danh sách sau khi thêm thành viên
  };
  

  const handleAddMemberPress = () => {
    setIsAddMemberModalVisible(true);
  }
  
  const handleCloseAddMemberModal = () => {
    setIsAddMemberModalVisible(false);
  };
  

  const renderMemberItem = ({ item }: { item: Member }) => (
    <CardComponent styles={[globalStyles.card, styles.memberCard]}>
      <View style={styles.memberIcon}>
        <View
          style={[
            styles.memberInitial,
            {
              backgroundColor: item.role === "host" ? appColors.primary : appColors.green,
            },
          ]}
        >
          <TextComponent
            text={ item.userId?.email?.charAt(0)} // Truy cập name từ item.userId
            color={appColors.white}
            size={18}
          />
        </View>
      </View>
      <View style={styles.memberDetails}>
        <TextComponent text={item.userId?.fullname || "???"} font="Roboto-Medium" size={16} />
        <TextComponent text={item.userId?.email || "No Email"} size={14} color={appColors.black} />
      </View>
      {item.role !== "host" && ( // Không cho phép xóa host
            <TouchableOpacity onPress={() => handleRemoveMember(item.userId._id)}>
                <Trash  color={appColors.danger} size={20} />
            </TouchableOpacity>
        )}
    </CardComponent>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMemberPress}>
          <Ionicons name="add-circle-outline" size={24} color={appColors.primary} />
          <TextComponent
            text="Thêm thành viên"
            color={appColors.primary}
            styles={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={membersData}
        keyExtractor={(item) => item._id}
        renderItem={renderMemberItem}
        contentContainerStyle={styles.listContent}
        // style={{ flex: 1 }}
      />

      <AddMemberModal
        visible={isAddMemberModalVisible}
        onClose={handleCloseAddMemberModal}
        onSave={handleMemberAdded}
        eventId={eventId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white2,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  addMemberButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
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
  memberIcon: {
    marginRight: 12,
  },
  memberInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  memberDetails: {
    flex: 1,
  },
  roleBadge: {
    backgroundColor: appColors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default MembersTab;
