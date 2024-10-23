import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import ListComponent from './ListComponent'
import TextComponent from './TextComponent'
import { AppInfo } from '../constants/AppInfor'
import { eventModel } from '../models/eventModel'
import AvataGroup from './AvataGroup'
import RowComponent from './RowComponent'
import { Location } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import SpaceComponent from './SpaceComponent'
import ContainerComponent from './ContainerComponent'
import SectionComponent from './SectionComponent'

interface Props{
    item: eventModel,
    type: 'card' | 'list'
}

const EventItem = (props: Props) => {
    const {item, type} = props
    
    
  return (
    <ListComponent isShadow styles={{width: AppInfo.sizes.WIDTH*0.85}} onPress={() =>{}}>
        <RowComponent  >
          
            <ImageBackground style={{height:60, width:60, padding:10}} source={require('../assets/images/travel.png')} imageStyle={{ resizeMode:'cover', borderRadius:12}} />
          
          
          {/* <SpaceComponent width={50}/> */}
          <SectionComponent styles={{flex:1,}}>
            
            <TextComponent numberOfLines={1} text={item.title} title size={18} />
            <AvataGroup />
            <RowComponent>
              <Location size={12} color={appColors.primary} variant='TwoTone' />
              <SpaceComponent width={5}/>
              <TextComponent flex={1} text={item.location.address} color={appColors.primary} size={12} />
            </RowComponent>
          </SectionComponent>
        </RowComponent>
    </ListComponent>
    
  )
}

export default EventItem