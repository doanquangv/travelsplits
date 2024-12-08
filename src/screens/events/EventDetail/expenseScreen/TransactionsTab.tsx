// // TransactionsTab.tsx
// import React from 'react';
// import { View, FlatList } from 'react-native';
// import TextComponent from '../../../../components/TextComponent';

// const TransactionsTab = ({ actualExpenses }: { actualExpenses: any[] }) => {
//   return (
//     <View style={{flex:1, padding:16}}>
//       <FlatList
//         data={actualExpenses}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={{marginBottom:20}}>
//             <TextComponent text={item.name} />
//             <TextComponent text={`Số tiền: ${item.amount}`} />
//             <TextComponent text={`Ngày: ${new Date(item.date).toLocaleString()}`} />
//             {/* Bạn có thể thêm thông tin 'người thêm' nếu server cung cấp */}
//           </View>
//         )}
//       />
//     </View>
//   );
// };
// export default TransactionsTab;
