import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { globalStyles } from '../styles/globalStyles'
import { Arrow, ArrowRight2, Location } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import CardComponent from './CardComponent'
import SpaceComponent from './SpaceComponent'
import ModalLocation from '../modals/ModalLocation'


const ChoiceLocation = () => {
    const [isVisibleModalLocation, setIsVisibleModalLocation ] = useState(false)
  return (
    <>
    <RowComponent onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)} styles={[globalStyles.inputContainer, ]}>

        <Location variant='Bold' color={appColors.primary} />
        <SpaceComponent width={10}/>
        <TextComponent text='Hanoi, VietNam'/>
        <ArrowRight2 size={20} color={appColors.primary}/>
    </RowComponent>
    
    <ModalLocation visible={isVisibleModalLocation} onClose={() => setIsVisibleModalLocation(false) } onSelect={val => console.log(val)}  />
    </>
  )
}

export default ChoiceLocation