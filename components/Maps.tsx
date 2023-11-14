import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useRouter } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import MapView from 'react-native-map-clustering'


interface Props {
    listings:any
}
const Maps = ({listings}:Props) => {
  const router = useRouter()
  const onMarker =(event:any)=>{
      router.push(`/listing/${event.properties.id}`)
  }
  const renderCluster = (cluster: any) => {
    const {id,geometry,onPress,properties} = cluster
    const points = properties.point_count
    return(
      <Marker 
      key={`cluster-${id}`} 
      onPress={onPress}
      coordinate={{
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }}>
        <View style={[styles.marker,{paddingHorizontal:8,paddingVertical:8,borderRadius:100}]}>
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'mon-sb'
          }}>{points}</Text>
        </View>
      </Marker>
    )
  }
  return (
    <View style={{ flex: 1 }}>
    <MapView
    animationEnabled={false}
      style={{ flex: 1 }}
      showsUserLocation
      showsMyLocationButton
      provider={PROVIDER_GOOGLE }
      clusterColor={Colors.primary}
      clusterFontFamily={'mon-sb'}
      renderCluster={renderCluster}
      initialRegion={{
        latitude: 45.523064,
        longitude: -122.676483,
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
    elevation:3,
    borderWidth: 0.25,
    borderColor: Colors.primary,
    marginBottom: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.84,

  },
  markerTxt:{
    fontFamily: 'mon-sb',
    fontSize: 12
  }
})