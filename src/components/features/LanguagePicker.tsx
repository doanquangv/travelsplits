// // components/LanguagePicker.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import i18n from '../../i18n/config';
// import { Picker } from '@react-native-picker/picker';
// const LanguagePicker = () => {
//   const [selectedLanguage, setSelectedLanguage] = React.useState<string>(i18n.locales.toString());

//   const handleLanguageChange = (itemValue: string) => {
//     setSelectedLanguage(itemValue);
//     i18n.locale = itemValue;
//   };

//   return (
//     <View>
//       <Text>{i18n.t('language')}</Text>
//       <Picker
//         selectedValue={i18n.locales.toString()}
//         onValueChange={handleLanguageChange}
//       >
//         <Picker.Item label={i18n.t('vietnamese')} value="vi" />
//         <Picker.Item label={i18n.t('english')} value="en" />
//       </Picker>
//     </View>
//   );
// };

// export default LanguagePicker;