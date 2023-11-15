import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeOutLeft, FadeInRight } from 'react-native-reanimated'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors'

interface Props {
    listings: any[]
    category: string
    refresh: number
}

const Listings = ({listings:items, category,refresh}: Props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null)
  useEffect(() => {
      if(refresh){
          listRef.current?.scrollToOffset({ animated: true, offset: 0 })
      }
  },[refresh])
  const [isTapped, setIsTapped] = useState<{[itemId: string]: boolean}>({}); 
  const handleTap = (itemId: string) => {
    setIsTapped((prevIsTapped) => ({
      ...prevIsTapped,
      [itemId]: !prevIsTapped[itemId]
    }));
  };
  const renderItem:ListRenderItem<any> = ({item}) => {
    if (!item.medium_url) {
      return null; 
    }
   
  
    return (
      <Link href={`/listing/${item.id}`} asChild>
        {/* Photo */}
        <TouchableOpacity>

          <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            <Image source={{uri: item.medium_url}} style={styles.img} />
            <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30,backgroundColor: '#fff', borderRadius: 50, padding: 3,borderColor: '#000', borderWidth: 0.25 }} onPress={() => handleTap(item.id)}>
            <Ionicons
              name={isTapped[item.id] ? 'heart' : 'heart-outline'}
              size={24}
              color={isTapped[item.id] ? Colors.primary : '#000'}
            />
          </TouchableOpacity>
            {/* Name star */}
            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'mon-sb', fontSize: 16}}>{item.name.length > 20 ? `${item.name.slice(0, 30)}...` : item.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='star' size={14} color={'#000'}  />
                <Text style={{fontFamily: 'mon-sb', marginLeft: 5, gap: 5}}>{item.review_scores_rating/20}</Text>
              </View>
            </View>
        {/* Room type */}
            <Text style={{fontFamily: 'mon', color: '#636262'}}>{item.room_type}</Text>
        {/* Price */}
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text style={{fontFamily: 'mon-sb'}}>$ {item.price}</Text>
              <Text style={{fontFamily: 'mon', color: '#636262'}}>night</Text>
            </View>
          
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  }
  
    useEffect(() => {
      setLoading(true)

        setTimeout(() => {
            setLoading(false)
          }, 100)
        },[category])
        return (
          <View style={defaultStyles.box}>
      <BottomSheetFlatList 
      renderItem={renderItem}
      data={loading ? [] : items}
      ref={listRef}
      ListHeaderComponent={<Text style={styles.info}>{items.length} homes for {category}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 20,
    gap: 10,
    marginVertical: 16,
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info:{
  textAlign: 'center',
  fontFamily: 'mon-b',
  fontSize: 16,
  marginBottom: 10
  }
})

export default Listings