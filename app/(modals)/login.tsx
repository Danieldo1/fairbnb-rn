import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy{
  Apple = 'oauth_apple',
  Google = 'oauth_google',
  Facebook = 'oauth_facebook'
}

const Login = () => {
  useWarmUpBrowser()
  const router = useRouter()

  const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'})
  const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'})
  const {startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

  const onAuth = async (strategy: Strategy) => {
      const selectAuth={
        [Strategy.Apple]: appleAuth,
        [Strategy.Google]: googleAuth,
        [Strategy.Facebook]: facebookAuth
      }[strategy]

      try {
        const {createdSessionId,setActive}= await selectAuth()
        if(createdSessionId){
          setActive!({session: createdSessionId})
          router.back()
        }
      } catch (error) {
        console.error('OAuth error', error)
      }
  }

  return (
    <View style={styles.box}>

      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputBox, {marginBottom: 30}]} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
{/* Line separator */}
      <View style={styles.separatorView}>
        <View style={{ borderBottomColor: '#000',borderBottomWidth: StyleSheet.hairlineWidth, flex: 1 }}/>
        <Text style={styles.separator}>or</Text>
        <View style={{ borderBottomColor: '#000',borderBottomWidth: StyleSheet.hairlineWidth, flex: 1 }}/>
      </View>
{/* Buttons */}
      <View style={{gap: 20}}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onAuth(Strategy.Apple)}>
          <Ionicons name='md-logo-apple' size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onAuth(Strategy.Google)}>
          <Ionicons name='md-logo-google' size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onAuth(Strategy.Facebook)}>
          <Ionicons name='md-logo-facebook' size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  box:{
    flex:1,
    backgroundColor: '#ffffff',
    padding:26
  },
  separatorView:{
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30
  },
  separator:{
    fontFamily: 'mon-sb',
    color: Colors.grey
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },

})

export default Login