// client/travelsplits/src/screens/events/MembersTab.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { appColors } from "../../../constants/appColors";
import TextComponent from "../../../components/TextComponent";
import CardComponent from "../../../components/CardComponent";
import { globalStyles } from "../../../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { ButtonComponent } from "../../../components";
import { fontFamily } from "../../../constants/fontFamilies";

const MembersTab = () => {
  // Dữ liệu mẫu về thành viên
  const membersData = [
    {
      id: "1",
      name: "Đoàn Quang Vũ (Tôi)",
      email: "kungvjp002@gmail.com",
      role: "Chủ trì",
    },
    {
      id: "2",
      name: "Vũ Đoàn Quang",
      email: "dqv2k2@gmail.com",
      role: "Thành viên",
    },
  ];

  const renderMemberItem = ({ item }: { item: any }) => (
    <CardComponent styles={[globalStyles.card, styles.memberCard]}>
      <View style={styles.memberIcon}>
        <View
          style={[
            styles.memberInitial,
            {
              backgroundColor: item.role === "Chủ trì" ? appColors.primary : appColors.green,
            },
          ]}
        >
          <TextComponent
            text={item.name.charAt(0)}
            color={appColors.white}
            size={18}
          />
        </View>
      </View>
      <View style={styles.memberDetails}>
        <TextComponent text={item.name} font="Roboto-Medium" size={16} />
        <TextComponent text={item.email} size={14} color={appColors.gray} />
      </View>
      {item.role === "Chủ trì" && (
        <View style={styles.roleBadge}>
          <TextComponent text="Chủ trì" color={appColors.white} size={12} />
        </View>
      )}
    </CardComponent>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addMemberButton}>
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
        keyExtractor={(item) => item.id}
        renderItem={renderMemberItem}
        contentContainerStyle={styles.listContent}
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
