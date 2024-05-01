import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from "expo-router"
import { Image } from 'expo-image'
import { SHADOW } from '../../utils/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

let User

AsyncStorage.getItem('user').then(userString => {
  if (userString) User = JSON.parse(userString)
}).catch(error => console.log(error))

const PROFILE_ITEMS = [
  { title: 'manage profile', onPress: () => router.push('/profile/manage') },
  { title: 'my clubs', onPress: () => router.push('/clubs') },
  { title: 'my events', onPress: () => router.push('/events') },
  { title: 'roles', onPress: () => router.push('/roles') },
  { title: 'create club', onPress: () => router.push('/profile/create') },
]

const profile = () => {
  const signout = () => {
    router.replace('signin')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Hero/>
      <View style={styles.itemsContainer}>
        {
          PROFILE_ITEMS.map(item => {
            if (!User.club && (item.title === 'my events' || item.title === 'roles' || item.title === 'my clubs')) {
              return null
            } else {
              return <Items
                key={item.title}
                title={item.title}
                handlePress={item.onPress}
              />
            }
          })
        }
      </View>
    </SafeAreaView>
  )
}

const Hero = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        style={styles.avatarContainer}
      >
        <Image
          source={
            User?.asset?.secure_url ||
            'https://i.pravatar.cc/300?img=1'
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Hello ${User.firstName}!`}</Text>
        <Text style={styles.message}>What would you like to view?</Text>
      </View>
    </View>
  )
}

const Items = ({title, handlePress = () => {}}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handlePress}
    >
      <Text style={styles.itemTitle}>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#EBEEF3',
  },
  headerContainer: {
    backgroundColor: '#EBEEF3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#EBEEF3',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  message: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 11,
    color: 'black',
    width: 150,
  },
  itemsContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  itemContainer: {
    width: 151,
    height: 156,
    borderRadius: 10,
    borderColor: '#365486',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize'
  }
})

export default profile