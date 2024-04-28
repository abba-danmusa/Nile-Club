import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeaturedItems from './FeaturedItems';

const FeaturedClubs = ({ clubs }) => {
  return (
    <FlatList
      data={clubs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index}
      renderItem={({ item }) => <FeaturedItems club={item}/>}
    />
  )
}

export default FeaturedClubs;