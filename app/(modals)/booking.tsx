import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Booking = () => {
  const router = useRouter()

  const clear = () => {
    
  }
  return (
    <BlurView intensity={70} style={styles.box} tint='light'>
      <Text>Booking</Text>

      

{/* footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
          <TouchableOpacity onPress={clear} style={{justifyContent: 'center',}}>
            <Text style={{fontFamily: 'mon-sb', textDecorationLine: 'underline',fontSize: 16}}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> router.back()} style={[defaultStyles.btn,{paddingRight: 20,paddingLeft: 50}]}>
            <Ionicons name='search-outline' size={22} color={'#fff'} style={[defaultStyles.btnIcon,{marginRight: 10}]} />
            <Text style={defaultStyles.btnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}
const styles = StyleSheet.create({
  box:{
    flex:1,
    paddingTop:100,
  }
})
export default Booking