import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useRouter } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'


interface Props {
    listings:any
}
const Maps = ({listings}:Props) => {
  const router = useRouter()
  const onMarker =(event:any)=>{
      router.push(`/listing/${event.properties.id}`)
  }
  return (
    <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      showsMyLocationButton
      provider='google'
      initialRegion={{
        latitude: 40.730610,
        longitude: -73.935242,
        latitudeDelta: 0.8522, // Adjust as needed
        longitudeDelta: 0.0221, // Adjust as needed
      }}
    >
      {listings.features.map((item:any) => (
        <Marker
        onPress={()=>onMarker(item)}
          key={item.properties.id}
          coordinate={{
            latitude: +item.properties.latitude,
            longitude: +item.properties.longitude,
          }}
        >
          <View style={styles.marker}>
            <Text style={styles.markerTxt}>$ {item.properties.price}</Text>
          </View>
        </Marker>
      ))}
    </MapView>
  </View>
  )
}

export default Maps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '110%',
    marginBottom: 60
  },
  marker:{
    backgroundColor: '#fff',
    padding:4,
    elevation:9,
    borderWidth: 0.25,
    borderColor: Colors.primary,
    marginBottom: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerTxt:{
    fontFamily: 'mon-sb',
    fontSize: 12
  }
})