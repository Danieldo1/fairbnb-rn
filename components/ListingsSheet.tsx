import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from './Listings'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface Props {
listings: any[]
category: string
}

const ListingsSheet = ({listings,category}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['12%', '100%'], []);
    const openMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh+1)
    }
    const [refresh, setRefresh] = useState(0)

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}
    handleIndicatorStyle={{backgroundColor: Colors.grey,margin:0}}
    enableContentPanningGesture
    enablePanDownToClose={false}
    index={1}
    style={styles.sheetBox}
    >
        <View style={{flex:1}}>
            <Listings listings={listings} category={category} refresh={refresh} />
            <View style={styles.absBtn}>
                <TouchableOpacity onPress={openMap} style={styles.roundButton}>
                    <Ionicons name='map-outline' size={20} color={'#fff'} />
                    <Text style={{fontFamily:'mon-b',color: '#fff',fontWeight:'bold'}}>Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
  )
}

export default ListingsSheet

const styles = StyleSheet.create({
    absBtn:{
        position:'absolute',
        bottom:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',

    },
    roundButton:{
        backgroundColor:Colors.dark,
        padding:16,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        flexDirection:'row',
        marginBottom:20
    },
    sheetBox:{
        backgroundColor: '#fff',
        elevation:3,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.84,
        borderRadius: 10,
       
    }
})