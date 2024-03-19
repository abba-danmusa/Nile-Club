import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../components/Avatar'
import BackButton from '../../components/BackButton'
import { router } from "expo-router"
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'

const PROFILE_ITEMS = [
  {
    title: 'edit profile',
    icon: () => <AntDesign name="edit" size={24} color="black" />,
    handlePress: () => router.push('/edit-profile')
  },
  {
    title: 'view membership',
    icon: () => <Feather name="shield" size={24} color="black" />,
    // handlePress: () => router.push('/edit-profile')
  },
  {
    title: 'roles',
    icon: () => <Ionicons name="ribbon" size={24} color="black" />,
    // handlePress: () => router.push('/edit-profile')
  },
  {
    title: 'security',
    icon: () => <AntDesign name="lock" size={24} color="black" />,
    // handlePress: () => router.push('/edit-profile')
  }
]

export default function manage() {

  const signout = () => {
    AsyncStorage.removeItem('token')
    router.back()
    router.replace('signin')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content" />
      <BackButton
        handlePress={() => router.back()}
        color='#365486'
        iconColor='#fff'
      />
      <Hero/>
      <View style={styles.profileItems}>
        {
          PROFILE_ITEMS.map(item => (
            <Items
              key={item.title}
              title={item.title}
              handlePress={item.handlePress}
              icon={item.icon}
            />
          ))
        }
      </View>
      <BottomButton title={'Log Out'} handlePress={signout} />
    </SafeAreaView>
  )
}

const Hero = () => {
  return (
    <View style={styles.hero}>
      <Avatar
        image={require('../../assets/home/avatar.png')}
        width={118} height={118}
      />
      <View>
        <Text style={styles.name}>Mimi Aminu</Text>
        <Text style={styles.department}>software engineering</Text>
        <Text style={styles.level}>400 level</Text>
      </View>
    </View>
  )
}

const Items = ({ title, handlePress = () => {}, icon = () => {} }) => {
  return (
    <TouchableOpacity style={styles.profileItem} onPress={handlePress}>
      {icon()}
      <Text style={styles.title}>{title}</Text>
      <Feather name="chevron-right" size={24} color="black" style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 26,
    fontWeight: '400',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  department: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  level: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  profileItems: {
    marginTop: 40,
  },
  profileItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 10,
    marginVertical: 10
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize',
    alignSelf: 'flex-start'
  },
  icon: { alignSelf: 'center', position: 'absolute', right: 10 }
})