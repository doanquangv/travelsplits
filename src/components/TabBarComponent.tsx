import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { TouchableOpacity } from 'react-native'
import { appColors } from '../constants/appColors'
import RowComponent from './RowComponent'
import { ArrowRight2 } from 'iconsax-react-native'


interface Props{
    title: string
    onPress: () => void
}
const TabBarComponent = (props: Props) => {
    const {title, onPress} = props
  return (
    <RowComponent styles= {{
      marginBottom:20,
      paddingHorizontal:10
    }}>
        <TextComponent text={title} title flex={1}  />
        <RowComponent onPress={onPress}>
            <TextComponent text='See All ' color='#747688' size={13} />
            <ArrowRight2 color={appColors.primary} size={16} />
        </RowComponent>
    </RowComponent>
  )
}

export default TabBarComponent