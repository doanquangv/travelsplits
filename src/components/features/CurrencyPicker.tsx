// // components/CurrencyPicker.tsx
// import React from 'react';
// import { View, Text,  } from 'react-native';
// import currency from 'currency.js';
// import { Picker } from '@react-native-picker/picker';

// const currencies = [
//   { code: 'VND', label: 'Việt Nam Đồng' },
//   { code: 'USD', label: 'US Dollar' },
//   { code: 'EUR', label: 'Euro' },
//   // ... thêm các loại tiền tệ khác
// ];

// const CurrencyPicker = () => {
//   const [selectedCurrency, setSelectedCurrency] = React.useState('VND');

//   const handleCurrencyChange = (itemValue: string) => {
//     setSelectedCurrency(itemValue);
//     // Lưu đơn vị tiền tệ vào AsyncStorage hoặc state
//   };

//   return (
//     <View>
//       <Text>Currency</Text>
//       <Picker
//         selectedValue={selectedCurrency}
//         onValueChange={handleCurrencyChange}
//       >
//         {currencies.map((c) => (
//           <Picker.Item key={c.code} label={`${c.label} (${c.code})`} value={c.code} />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// export default CurrencyPicker;