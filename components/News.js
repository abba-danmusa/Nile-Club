import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import NewsAnnouncement from './home/NewsAnnouncement'

const NEWS_ANNOUNCEMENTS = [
  {
    image: require('../assets/home/model-un-club-1.png'),
    name: 'Model UN Club',
    description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
  },
  {
    image: require('../assets/home/photography-club.png'),
    name: 'Photography Club',
    description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
  },
  {
    image: require('../assets/home/model-un-club-1.png'),
    name: 'Model UN Club',
    description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
  },
  {
    image: require('../assets/home/photography-club.png'),
    name: 'Photography Club',
    description: 'Model UN announces a new president and new cabinet members for the model UN secretariat. The new appointees will be announced in our upcoming orientation',
  }
]
export default function News({item = [...NEWS_ANNOUNCEMENTS]}) {
  return (
    <FlatList
      containerStyle={styles.mainContainer}
      style={{ paddingBottom: 60 }}
      data={item}
      keyExtractor={(_, index) => index}
      renderItem={({ item }) => <NewsAnnouncement item={item} />}
    />
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#EBEEF3',
    alignContent: 'center',
    marginBottom: 10,
  },
})