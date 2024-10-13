// screens/user.tsx
import * as React from 'react';
import { Text, View } from 'react-native';
// import LanguagePicker from '../components/features/LanguagePicker';
// import CurrencyPicker from '../components/features/CurrencyPicker';

function User() {
  return (
    <View style={{ flex: 1,  }}>
      <Text>Thông tin người dùng</Text>
      {/* <LanguagePicker />
      <CurrencyPicker /> */}
    </View>
  );
}

export default User;