import { View, Text,StyleSheet, Dimensions, TouchableOpacity,Image, Share } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import listingData from  '@/assets/data/airbnb-listings.json'
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'

const img_height = 300
const {width} = Dimensions.get('window')

const Page = () => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset= useScrollViewOffset(scrollRef)
  
    const {id} = useLocalSearchParams<{id: string}>();
    const listing = (listingData as any[]).find((item)=> item.id == id)

    const imgAnimatedStyle = useAnimatedStyle(()=>{
      return {
        transform: [
          {
            translateY: interpolate(scrollOffset.value, [-img_height,0,img_height], [-img_height / 2, 0, img_height * 0.75])
          },
          {
            scale: interpolate(scrollOffset.value, [-img_height,0,img_height], [2, 1, 1])
          }
        ]
      }
    })
    const navigation = useNavigation()
    const share=async()=>{
      try {
        await Share.share({
          title: listing?.name,
          url: listing?.listing_url
        })
      } catch (error) {
        console.log(error)
      }
    }
    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackground: () => (
          <Animated.View style={[styles.header, imgAnimatedStyle]} />
        ),
        headerRight: () => (
          <View style={styles.bar}>
            <TouchableOpacity style={styles.roundButton} onPress={share}>
              <Ionicons name='share-outline' size={24} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton} onPress={share}>
              <Ionicons name='heart-outline' size={24} color={'#000'} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}  >
            <Ionicons name='chevron-back' size={28} color={'#000'}/>
          </TouchableOpacity>
        )
      })
    },[])


  return (
    <View style={styles.box}>
      <Animated.ScrollView 
      ref={scrollRef}
      contentContainerStyle={{ paddingBottom: 100 }}
      scrollEventThrottle={16}

      >
        <Animated.Image source={{uri: listing?.xl_picture_url}} style={[styles.image,imgAnimatedStyle]} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>$ {listing.price}</Text>
            <Text>night</Text>
            <Text>{listing.guests_included} guests</Text>
          </TouchableOpacity>
          {/* Reserve */}
          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  box:{
    flex:1,
    backgroundColor: '#ffffff',
  },
  image:{
    width, 
    height: img_height
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
})

export default Page