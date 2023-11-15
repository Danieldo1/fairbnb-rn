import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ModalHeader = () => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontFamily:'mon-sb',fontSize:18}}>Where to?</Text>
      <Text style={{fontFamily:'mon',fontSize:18}}> · Any Week</Text>
    </View>
  )
}

export default ModalHeader

const styles = StyleSheet.create({})
