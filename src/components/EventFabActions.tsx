// // EventFabActions.tsx

// import React, { useState } from "react";
// import { FAB } from "react-native-paper";

// import { useNavigation } from "@react-navigation/native";
// import AddBudgetModal from "../modals/eventModals/AddBudgetModal";
// import AddActualExpense from "../modals/eventModals/AddActualExpense";
// import AddMemberModal from "../modals/eventModals/AddMemberModal";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../navigations/types";
// import expenseAPI from "../apis/expenseApi";
// import { Alert } from "react-native";

// interface EventFabActionsProps {
//   eventId: string;
//   onRefresh: () => void;
//   isHost: boolean; // xác định xem user có phải host không
// }

// type FABNavigationProp = StackNavigationProp<
//   RootStackParamList>;

// const EventFabActions: React.FC<EventFabActionsProps> = ({ eventId, onRefresh, isHost }) => {
//   const [isFabOpen, setIsFabOpen] = useState(false);
//   const [showBudgetModal, setShowBudgetModal] = useState(false);
//   const [showExpenseModal, setShowExpenseModal] = useState(false);
//   const [showAddMemberModal, setShowAddMemberModal] = useState(false);

//   const navigation = useNavigation<FABNavigationProp>();

//   const handleSaveBudget = async (data: {
//     title: string;
//     amount: string;
//     addedBy: string;
//   }) => {
//     try {
//       const response = await expenseAPI.HandleExpense(
//         `/${eventId}/budget`,
//         { ...data, amount: parseFloat(data.amount) },
//         "put"
//       );
//       setShowBudgetModal(false);
//       onRefresh();
//     } catch (error: any) {
//       if (error.response?.status === 403) {
//         Alert.alert("Lỗi", "Bạn không có quyền thực hiện thao tác này.");
//       } else {
//         Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại.");
//       }
//     }
//   };

//   const handleSaveExpense = async (data: {
//     name: string;
//     amount: string;
//     category: string;
//     date: string;
//   }) => {
//     try {
//       console.log("Gửi dữ liệu đến server:", {
//         name: data.name,
//         amount: parseFloat(data.amount),
//         category: data.category,
//         date: data.date,
//       });

//       const response = await expenseAPI.HandleExpense(
//         `/${eventId}/expenses`,
//         {
//           name: data.name,
//           amount: parseFloat(data.amount),
//           category: data.category,
//           date: data.date,
//         },
//         "post"
//       );

//       if (!response.data?.actualExpenses) {
//         console.error("Dữ liệu trả về từ server không hợp lệ:", response.data);
//         alert("Lỗi: Không thể cập nhật danh sách chi tiêu.");
//       }

//       setShowExpenseModal(false);
//       onRefresh();
//     } catch (error: any) {
//       if (error.response?.status === 403) {
//         Alert.alert("Lỗi", "Bạn không có quyền thực hiện thao tác này.");
//       } else {
//         Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại.");
//       }
//     }
//   };

//   const handleMemberAdded = async (email: string) => {
//     try {
//       await expenseAPI.HandleExpense(
//         `/${eventId}/members`,
//         { email },
//         "post"
//       );
//       setShowAddMemberModal(false);
//       onRefresh();
//     } catch (error: any) {
//       if (error.response?.status === 403) {
//         Alert.alert("Lỗi", "Bạn không có quyền thực hiện thao tác này.");
//       } else {
//         Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại.");
//       }
//     }
//   };

//   const handleAddSchedule = () => {
//     // Điều hướng sang màn hình thêm lịch trình
//     navigation.navigate("AddNewSchedule", { eventId });
//   };

//   if (!isHost) {
//     // Nếu không phải host, có thể ẩn FAB hoặc chỉ show các actions member được phép làm
//     // Ở đây giả sử member không được thấy FAB, bạn có thể return null hoặc show ít actions hơn
//     return null;
//   }

//   return (
//     <>
//       <FAB.Group
//         visible={true}
//         open={isFabOpen}
//         icon={isFabOpen ? "close" : "plus"}
//         actions={[
//           {
//             icon: "cash-plus",
//             label: "Thêm Tổng Tiền",
//             onPress: () => setShowBudgetModal(true),
//           },
//           {
//             icon: "clipboard-plus",
//             label: "Thêm Chi Tiêu",
//             onPress: () => setShowExpenseModal(true),
//           },
//           {
//             icon: "calendar-plus",
//             label: "Thêm Lịch Trình",
//             onPress: handleAddSchedule,
//           },
//           {
//             icon: "account-plus",
//             label: "Thêm Thành Viên",
//             onPress: () => setShowAddMemberModal(true),
//           },
//         ]}
//         onStateChange={({ open }) => setIsFabOpen(open)}
//         style={{
//           position: "absolute",
//           bottom: 20,
//           right: 20,
//         }}
//       />

//       <AddBudgetModal
//         visible={showBudgetModal}
//         onClose={() => setShowBudgetModal(false)}
//         onSave={handleSaveBudget}
//         eventId={eventId}
//       />
//       <AddActualExpense
//         visible={showExpenseModal}
//         onClose={() => setShowExpenseModal(false)}
//         onSave={handleSaveExpense}
//         eventId={eventId}
//       />
//       <AddMemberModal
//         visible={showAddMemberModal}
//         onClose={() => setShowAddMemberModal(false)}
//         onSave={handleMemberAdded}
//         eventId={eventId}
//       />
//     </>
//   );
// };

// export default EventFabActions;
