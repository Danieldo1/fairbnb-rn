import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import {  Stack } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'
import Maps from '@/components/Maps'
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsSheet from '@/components/ListingsSheet'


const Page = () => {
  const [category, setCategory] = useState('Tiny Homes')
  const items = useMemo(() => listingsData as any, [])
  const geoItems = useMemo(() => listingDataGeo as any, [])

  const onDataChange = (category: string) => {
    setCategory(category)
  }
  return (

    // Explorer page
    <View style={{flex: 1,marginTop:80}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      {/* <Listings category={category} listings={items} /> */}
        <Maps listings={geoItems} />
        <ListingsSheet listings={items} category={category} />
    </View>
  )
}

export default Page