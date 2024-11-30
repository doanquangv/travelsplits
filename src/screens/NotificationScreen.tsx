import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Thư viện biểu tượng
import TextComponent from '../components/TextComponent';

const NotificationScreen = () => {
  const notifications = [
    {
      id: '1',
      message: 'Vũ đã được thêm vào sự kiện đi núi thành công.',
      icon: 'person-add', // Biểu tượng người
      iconLib: 'MaterialIcons',
      timestamp: '2024-11-21 09:30',
    },
    {
      id: '2',
      message: 'Vũ đã thêm một khoản chi tiêu vào sự kiện hiking.',
      icon: 'money-bill-wave', // Biểu tượng tiền
      iconLib: 'FontAwesome5',
      timestamp: '2024-11-21 10:00',
    },
    {
      id: '3',
      message: 'Vũ đã thêm số tiền tổng vào sự kiện đi biển.',
      icon: 'attach-money', // Biểu tượng thêm tiền
      iconLib: 'MaterialIcons',
      timestamp: '2024-11-21 11:15',
    },
    {
      id: '4',
      message: 'Vũ đã thêm một lịch trình mới vào sự kiện đi trip đường dài thành công.',
      icon: 'calendar', // Biểu tượng lịch trình
      iconLib: 'FontAwesome5',
      timestamp: '2024-11-21 13:45',
    },
    {
      id: '5',
      message: 'Vũ đã thay đổi số tiền đóng góp cho sự kiện.',
      icon: 'cash', // Biểu tượng tiền
      iconLib: 'Ionicons',
      timestamp: '2024-11-21 15:20',
    },
  ];

  // Hàm để hiển thị biểu tượng
  const renderIcon = (icon: string, iconLib: string) => {
    switch (iconLib) {
      case 'MaterialIcons':
        return <MaterialIcons name={icon as any} size={28} color="#B198BD" />;
      case 'Ionicons':
        return <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={28} color="#B198BD" />;
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} size={28} color="#B198BD" />;
      default:
        return null;
    }
  };

  // Hàm render item của FlatList
  const renderNotificationItem = ({ item }: { item: { id: string; message: string; icon: string; iconLib: string; timestamp: string } }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        {renderIcon(item.icon, item.iconLib)}
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timestampText}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextComponent styles={{marginTop:50, paddingHorizontal:20}} text="Thông báo" title  size={40}/>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    paddingTop: 50,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default NotificationScreen;
