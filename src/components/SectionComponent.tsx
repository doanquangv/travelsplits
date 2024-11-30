import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    children: ReactNode;
    styles?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

const SectionComponent = (prop: Props) => {

    const { children, styles, onPress } = prop;
  return (
    <View style={[globalStyles.section,{}, styles]}>
      {children}
    </View>
  )
}

export default SectionComponent