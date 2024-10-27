import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { fontFamily } from '../constants/fontFamilies'
import SpaceComponent from './SpaceComponent'

const AvataGroup = () => {
  const photoUrl = 'https://cdn.vox-cdn.com/thumbor/RDXYhT0iwKRP7i_O2FbvkHxB7Ls=/0x0:4800x3300/1200x800/filters:focal(2064x0:2832x768)/cdn.vox-cdn.com/uploads/chorus_image/image/72865582/1792435167.0.jpg'
  return (
    <RowComponent justify='flex-start' styles={{marginVertical:5}} >
      {Array.from({length: 3}).map((item, index) => (

          <Image 
          key={`img-${index}`}
            source={{uri: photoUrl}} style ={{
              width:24,
              height:24,
              borderRadius:100,
              borderWidth:2,
              borderColor:appColors.white,
              marginLeft:index >0 ? -10 : 0
          }} />
        ))
      }
      <SpaceComponent width={3}/>
      <TextComponent text='+20 Going' size={12} color={appColors.primary} font={fontFamily.semibold}/>
    </RowComponent>
  )
}

export default AvataGroup