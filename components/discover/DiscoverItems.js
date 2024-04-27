import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const DiscoverItems = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push('/club')}
      key={item._id}
      style={styles.container}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingsContainer}>
            <AntDesign name="star" size={8} color="#365486" />
            <View style={{ alignItems: 'flex-end', height: 10 }}>
              <Text style={styles.rating}>{item.ratings}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 170,
    height: 250,
    borderRadius: 5,
    marginHorizontal: 5
  },
  image: {
    height: 150,
    width: '100%',
    contentFit: 'cover',
    borderRadius: 5,
  },
  content: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingsContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 21,
  },
  rating: {
    fontSize: 8,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  title: {
    fontSize: 12,
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
    marginBottom: 5,
  },
})

export default DiscoverItems;
