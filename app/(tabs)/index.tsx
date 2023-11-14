import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import {  Stack } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'

const Page = () => {
  const [category, setCategory] = useState('Tiny Homes')
  const items = useMemo(() => listingsData as any, [])

  const onDataChange = (category: string) => {
    setCategory(category)
  }
  return (

    // Explorer page
    <View style={{flex: 1,marginTop:160}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listings category={category} listings={items} />
    </View>
  )
}

export default Page