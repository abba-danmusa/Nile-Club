import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeaturedItems from './FeaturedItems';
import { getStatusBarHeight } from '../../utils/methods'

const FeaturedClubs = ({ clubs }) => {
  return (
    <FlatList
      data={clubs}
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index}
      renderItem={({ item }) => <FeaturedItems club={item}/>}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100 + getStatusBarHeight()
  }
})

export default FeaturedClubs;