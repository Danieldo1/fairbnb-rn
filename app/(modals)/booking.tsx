import { View, Text,StyleSheet, TouchableOpacity, TextInput, ScrollView ,Image} from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'

// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';


const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const Booking = () => {
  const [open, setOpen] = useState(0)
  const [selected, setSelected] = useState(0)
  const [group, setGroup] = useState(guestsGroups)
  const router = useRouter()
  const today = new Date().toISOString().substring(0,10)

  const clear = () => {
    setSelected(0)
    setGroup(guestsGroups)
    setOpen(0)

  }
  return (
    <BlurView intensity={70} style={styles.box} tint='light'>
      {/* Where */}
      <View style={styles.card}>
        {open != 0 && (
          <AnimatedTouchableOpacity onPress={()=>setOpen(0)}
          style={styles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          >
            <Text style={styles.title}>Where</Text>
            <Text style={styles.text}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {open === 0 && (
          <>
          <Text style={styles.header}>Where to?</Text>
          <View style={styles.cardMain}>
            <View style={styles.inputBox}>
              <Ionicons name='ios-search' size={20} color={Colors.dark} style={styles.icon} />
              {/* <TextInput placeholder='Anywhere' placeholderTextColor={Colors.dark} style={styles.inputBox} /> */}
            </View>
          </View>

            <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap:25, }}
            // style={styles.scroll}
            >
              {places.map((item, index)=>(
                <TouchableOpacity key={index} onPress={()=>setSelected(index)}>
                  <Image source={item.img} style={selected === index ? styles.scrollItemImgSelected : styles.scrollItemImg} />
                  <Text style={[{fontFamily:'mon',paddingTop:6},selected === index ? {fontFamily: 'mon-b'}:{fontFamily: 'mon'}]}>{item.title}</Text>
                </TouchableOpacity>
              ))}

            </ScrollView>
          </>
        )}
      </View>


        {/* When */}
      <View style={styles.card}>
        {open != 1 && (
          <AnimatedTouchableOpacity onPress={()=>setOpen(1)} style={styles.cardPreview} entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}>
            <Text style={styles.title}>When</Text>
            <Text style={styles.text}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {open === 1 && (
          <>
          <Text style={styles.header}>When's your trip?</Text>
          <View>
        <DatePicker 
        current={today}
        selected={today}
        mode={'Calendar'}
        options={{
          defaultFont: 'mon',
          headerFont: 'mon-sb',
          textFont: 'mon',
          borderColor: 'transparent',
          mainColor: Colors.primary
        }}
        />
          </View>
          </>
        )}
      </View>


        {/* Who */}
      <View style={styles.card}>
        {open != 2 && (
          <AnimatedTouchableOpacity onPress={()=>setOpen(2)} style={styles.cardPreview}      entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}>
            <Text style={styles.title}>Who</Text>
            <Text style={styles.text}>Add guest</Text>
          </AnimatedTouchableOpacity>
        )}
        {open === 2 && (
          <>
          <Text style={styles.header}>Who's coming?</Text>
          <View style={[styles.cardMain]}>
            {group.map((item, index)=>(
              <View key={index} style={[styles.guestBox,index + 1 < group.length ? styles.border : null]}>

                <View>
                  <Text style={{fontFamily: 'mon-sb', fontSize: 16,}}>{item.name}</Text>
                  <Text style={{fontFamily: 'mon', color: '#636262', fontSize: 14}}>{item.text}</Text>
                </View>

                <View style={{flexDirection: 'row',alignItems: 'center',gap: 10,justifyContent: 'center'}}>
                  <TouchableOpacity  onPress={()=> {
                    const newGroup = [...group]
                    newGroup[index].count >0 ? newGroup[index].count -= 1 :0
                    setGroup(newGroup)
                  }}>
                    <Ionicons name='remove-circle-outline' size={28} color={group[index].count > 0 ? Colors.grey : "#cdcdcd"} />
                  </TouchableOpacity>
                    <Text style={{fontFamily: 'mon',minWidth:18}}>{item.count}</Text>
                  <TouchableOpacity onPress={()=> {
                    const newGroup = [...group]
                    newGroup[index].count += 1
                    setGroup(newGroup)
                  }}>
                    <Ionicons name='add-circle-outline' size={28} color={Colors.grey} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          </>
        )}
      </View>


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
  },
  card:{
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    gap: 16,
    marginHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  cardPreview:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  title:{
    fontFamily: 'mon-sb',
    fontSize: 16,
    color: Colors.grey,
  },
  text:{
    fontFamily: 'mon-sb',
    fontSize: 16,
    color: Colors.dark,
  },
  header:{
    fontFamily: 'mon-b',
    fontSize: 24,
   padding:20
  },
  cardMain:{
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  inputBox:{
    height: 50,
    flexDirection: 'row',
    borderWidth:1,
    borderColor: Colors.grey,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  input:{
   
  },
  icon:{
    padding:10
  },
  scrollItemImgSelected:{
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth:2,
    borderColor: Colors.grey
  },
  scrollItemImg:{
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  guestBox:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:16,

  },
  border:{
    borderBottomColor: Colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth
  }

})
export default Booking