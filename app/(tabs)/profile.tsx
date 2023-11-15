import { View, Text, Button,StyleSheet, TouchableOpacity,Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';


const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(!user) {return}

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  },[user])

  const saveUser = async() => {
    try {
      if (!firstName || !lastName) {
        return;
      }
      await user?.update({
        firstName,
        lastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const captureImg = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.75,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,

      })
    }
  }

  return (
    <SafeAreaView style={defaultStyles.box}>
    <View>
      <View style={styles.header}>
        <Text style={{fontFamily: 'mon-b', fontSize: 24}}>Profile</Text>
        <Ionicons name='notifications-outline' size={24} color={'#000'} />
      </View>
    {/* User Info */}
    {user && (
      <View style={styles.card}>
        <TouchableOpacity onPress={captureImg}>
          <Image source={{uri: user?.imageUrl}} style={styles.pic} />
        </TouchableOpacity>
        <View style={styles.info}>
        {edit ? (
          <View style={styles.edit}>
            <TextInput placeholder='First Name' value={firstName || ''} onChangeText={setFirstName} style={[defaultStyles.inputBox,{width: 100}]} />
            <TextInput placeholder='Last Name' value={lastName || ''} onChangeText={setLastName} style={[defaultStyles.inputBox,{width: 100}]} />
               <TouchableOpacity onPress={saveUser}>
                <Ionicons name='checkmark-outline' size={20} color={'#000'} />
              </TouchableOpacity>
          </View>
        ):(
          <View style={styles.edit}>
              <Text style={{fontFamily: 'mon-sb', fontSize: 16}}>{firstName} {lastName}</Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name='create-outline' size={20} color={'#000'} />
              </TouchableOpacity>
          </View>
        )}
        </View>
        <Text style={{fontFamily: 'mon-sb', fontSize: 16}}>{email}</Text>
        <Text style={{fontFamily: 'mon-sb', fontSize: 14}}>since {user?.createdAt?.toLocaleDateString()}</Text>
      </View>
    )}


      {isSignedIn && <Button title='Logout'  onPress={() => signOut()} color={Colors.dark}/>}
      {!isSignedIn && <Link href={'/(modals)/login'} asChild><Button color={Colors.dark} title='Login' /></Link> }
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header: {
   flexDirection: 'row',
   padding: 24,
   justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  card:{
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 24,
    gap: 16,
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop:24,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  pic:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary
  },
  info:{
    gap: 8,
    flexDirection: 'row'
  },
  edit:{
    flex:1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }
})
export default Profile