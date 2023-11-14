import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

const Login = () => {
  useWarmUpBrowser()



  return (
    <View style={styles.box}>
      
      <TextInput autoCapitalize='none' placeholder='Email' />
    </View>
  )
}

const styles=StyleSheet.create({
  box:{
    flex:1,
    backgroundColor: '#ffffff',
    padding:26
  },
})

export default Login